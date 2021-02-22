import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: String
});

export default model('post', PostSchema);
