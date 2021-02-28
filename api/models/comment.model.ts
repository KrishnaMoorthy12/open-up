import { Schema, model, Document } from 'mongoose';

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, required: true },
  parent: { type: Schema.Types.ObjectId, required: true },

  author: { type: Schema.Types.ObjectId },
  is_anonymous: { type: Schema.Types.Boolean, default: false },

  body: { type: Schema.Types.String, required: true },
  upvotes: { type: Schema.Types.Number, default: 0 },
  downvotes: { type: Schema.Types.Number, default: 0 },

  depth: { type: Schema.Types.Number, default: 0 }
});

interface IComment extends Document {
  post: string;
  parent: string;
  author?: string;
  is_anonymous?: boolean;
  body: string;
  upvotes?: number;
  downvotes?: number;
  depth?: number;
}

export default model<IComment>('comment', CommentSchema);
