import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: Schema.Types.String, unique: true, required: true },
    name: { type: Schema.Types.String, required: true },
    bio: { type: Schema.Types.String },
    email: { type: Schema.Types.String, unique: true, required: true },
    password: { type: Schema.Types.String, required: true }
  },
  {
    timestamps: true
  }
);

interface IUser extends Document {
  username: string;
  name: string;
  bio?: string;
  email: string;
  password: string;

  createdAt: string;
  updatedAt: string;
  _doc?: IUser;
}

export default model<IUser>('user', UserSchema);
