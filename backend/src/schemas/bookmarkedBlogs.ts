import mongoose, { Schema, model } from 'mongoose';

const bookmarkedSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'blog',
    required: true,
  },
});

const bookmarkedBlog = model('bookmarkedBlog', bookmarkedSchema);
export default bookmarkedBlog;
