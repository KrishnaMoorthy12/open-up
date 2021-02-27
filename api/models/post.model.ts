import { Schema, model, Document } from 'mongoose';

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId },
  is_anonymous: { type: Schema.Types.Boolean, default: false },

  title: { type: Schema.Types.String, required: true },
  body: { type: Schema.Types.String, required: true },

  views: { type: Schema.Types.Number, default: 0 },
  upvotes: { type: Schema.Types.Number, default: 0 },
  downvotes: { type: Schema.Types.Number, default: 0 },

  tags: [{ type: Schema.Types.String }]
});

interface IPost extends Document {
  author: string;
  is_anonymous?: boolean;
  title: string;
  body: string;
  views?: number;
  upvotes?: number;
  downvotes?: number;
  tags?: Array<string>;
}

export default model<IPost>('post', PostSchema);
