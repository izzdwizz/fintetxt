import mongoose from 'mongoose';
import pkg from 'validator';

const { isEmail } = pkg; 

const apiKeySchema = new mongoose.Schema({
    key: { 
        type: String, required: true 
    },
    version: { 
        type: Number, required: true 
    },
    invalidated: { 
        type: Boolean, default: false 
    },
}, { 
    timestamps: { 
        createdAt: true, updatedAt: false 
    } 
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Please enter an email'], 
    unique: true,
    lowercase: true, 
    validate: [isEmail, 'Please enter a valid email']
  },
  confirmed: { 
    type: Boolean, 
    default: false 
  },
  apiKeys: [apiKeySchema]
}, {
  timestamps: true // Add createdAt and updatedAt fields for the user schema
});

const User = mongoose.model('User', userSchema);

export default User;