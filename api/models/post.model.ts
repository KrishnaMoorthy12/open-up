import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  author: String,
  is_anonymous: { type: Boolean, default: false },

  title: { type: String, required: true },
  body: { type: String, required: true },

  views: { type: Number, default: 0 },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },

  tags: [{ type: String }]
});

export default model('post', PostSchema);
