import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import File from '../models/fileModel.js';
import multer from 'multer';

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file'); // 'file' is the name of the input field in Postman

const handleErrors = (err) => {
    console.error(err.message, err.code); // Improved error logging for troubleshooting
    let errors = { email: '', apiKey: '' };

    if (err.message === 'Email not registered') {
        errors.email = 'Email does not exist';
    }

    if (err.message === 'Email not confirmed') {
        errors.email = 'Email not confirmed. Please confirm your email first.';
    }

    if (err.code === 11000) {
        errors.email = 'Email already registered';
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    if (err.message === 'User not found') {
        errors.email = 'User not found';
    }

    if (err.message.startsWith('Invalid or invalidated API key')) {
        errors.apiKey = err.message;
    }

    return errors;
};

const fileController = {
    uploadFile: asyncHandler(async (req, res) => {
        const { apikey } = req.headers;

        // Use multer to handle file upload
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: 'File upload failed' });
            }

            const { email } = req.body;

            try {
                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error('User not found');
                }

                const apiKeyData = user.apiKeys.find(key => key.key === apikey && key.invalidated);

                if (!apiKeyData) { 
                    throw new Error(`Invalid or invalidated API key. Inputted API key: ${apikey}, User's API key(s): ${user.apiKeys.map(key => key.key).join(', ')}`);
                }

                // Get the uploaded file
                const fileBuffer = req.file.buffer;

                // Convert the file to a base64 string
                const fileBase64 = fileBuffer.toString('base64');

                // Check if a File document for this user already exists
                let fileDoc = await File.findOne({ user: user._id });

                if (fileDoc) {
                    // If a document exists, add the new image to the images array
                    fileDoc.images.push({
                        data: fileBase64,
                        apiKey: apikey,
                        dateUploaded: new Date()
                    });
                } else {
                    // If no document exists, create a new one
                    fileDoc = new File({
                        user: user._id,
                        email: user.email,
                        images: [{
                            data: fileBase64,
                            apiKey: apikey,
                            dateUploaded: new Date()
                        }]
                    });
                }

                await fileDoc.save();

                res.status(201).json({ message: 'File uploaded successfully' });
            } catch (err) {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            }
        });
    }),
};

export default fileController;
