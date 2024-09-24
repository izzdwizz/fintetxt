import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true
  },
  dateUploaded: {
    type: Date,
    default: Date.now
  }
});
// File Schema model
const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  images: [imageSchema]
});

const File = mongoose.model('File', fileSchema);

export default File;
