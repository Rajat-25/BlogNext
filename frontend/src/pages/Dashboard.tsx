import { useSelector } from 'react-redux';
import {
  RootState,
  useFetchBookmarkedBlogQuery,
  useFetchUserBlogsQuery,
} from '../store';

const Dashboard = () => {
  const { token, currentUser: data } = useSelector(
    (state: RootState) => state.user_slice
  );

  const { data: blogData, isLoading: blogLoading } = useFetchUserBlogsQuery({
    token,
  });

  const { data: bookmarkData } = useFetchBookmarkedBlogQuery({
    token,
  });

  const fieldClass = ' w-10/12 p-4 rounded-full shadow-md ';

  if (blogLoading) {
    return <div>Loading...</div>;
  } else {
    const { firstName, lastName, email } = data as CurrUserType;
    return (
      <div className='h-screen w-screen grid grid-cols-4 p-2 gap-4 '>
        <div className='flex  justify-center items-start    col-span-1'>
          <img src={'./Img.png'} className='w-40 h-40' alt='' />
        </div>
        <div className=' rounded flex flex-col gap-8 col-span-3 p-4 '>
          <div className={fieldClass}>
            <span className='font-medium'>First name</span> : {firstName}
          </div>
          <div className={fieldClass}>
            <span className='font-medium'>Last name</span> : {lastName}
          </div>
          <div className={fieldClass}>
            <span className='font-medium'>Email</span> : {email}
          </div>
          <div className={fieldClass}>
            <span className='font-medium'>Blogs</span> : {blogData?.length}
          </div>
          <div className={fieldClass}>
            <span className='font-medium'>Bookmarked</span> : {bookmarkData?.length}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
