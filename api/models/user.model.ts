import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

export default model('user', UserSchema);
