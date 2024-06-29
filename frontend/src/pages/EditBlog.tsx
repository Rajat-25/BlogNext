import React from 'react';
import { useSelector } from 'react-redux';
import BlogForm from '../components/BlogForm';
import { RootState, useEditBlogMutation } from '../store';

const EditBlog: React.FC = () => {
  const { currentBlog } = useSelector((state: RootState) => state.blog_slice);

  const { title, description, _id: id } = currentBlog as BlogResponseType;
  const data = { title, description };

  const [editBlog] = useEditBlogMutation();

  const editHandler = ({ token, blog }: CreateBlogReqType) => {
    editBlog({ token, blog, id });
  };

  return (
    <div>
      <BlogForm func={editHandler} data={data} />
    </div>
  );
};

export default EditBlog;
