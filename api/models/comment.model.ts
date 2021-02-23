import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
  post: { type: Schema.Types.ObjectId, required: true },
  parent: { type: Schema.Types.ObjectId, required: true },

  author: { type: Schema.Types.ObjectId },
  is_anonymous: { type: Schema.Types.Boolean, default: false },

  title: { type: Schema.Types.String, required: true },
  body: { type: Schema.Types.String, required: true },

  views: { type: Schema.Types.Number, default: 0 },
  upvotes: { type: Schema.Types.Number, default: 0 },
  downvotes: { type: Schema.Types.Number, default: 0 },

  tags: [{ type: Schema.Types.String }]
});

export default model('post', PostSchema);
