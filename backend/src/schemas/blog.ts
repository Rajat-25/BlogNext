import { model, Schema } from 'mongoose';

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const nDate = `${day}-${month}-${year} ${hours}:${minutes}`;
  return nDate;
}

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: String,
    default: () => formatDate(new Date()),
  },
});

const Blog = model('blog', blogSchema);

export default Blog;
