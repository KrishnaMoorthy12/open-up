import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: Schema.Types.String, unique: true, required: true },
  name: { type: Schema.Types.String, required: true },
  bio: { type: Schema.Types.String },
  email: { type: Schema.Types.String, unique: true, required: true },
  password: { type: Schema.Types.String, required: true }
});

export default model('user', UserSchema);
