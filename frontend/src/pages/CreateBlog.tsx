import BlogForm from '../components/BlogForm';
import { useCreateBlogMutation } from '../store';

const CreateBlog = () => {
  const [createBlog] = useCreateBlogMutation();

  const createHandler = ({ token, blog }: CreateBlogReqType) => {
    createBlog({ token, blog });
  };

  const data = {
    title: '',
    description: '',
  };
  return <BlogForm func={createHandler} data={data} />;
};

export default CreateBlog;
