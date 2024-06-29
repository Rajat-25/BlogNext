import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [5, 'Password must be 5 characters long'],
  },
});

const User = model('user', userSchema);

export default User;
