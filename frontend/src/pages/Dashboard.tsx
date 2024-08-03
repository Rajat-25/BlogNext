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

  const fieldClass = ' p-4 border-b text-sm sm:text-base rounded-full shadow  ';

  if (blogLoading) {
    return <div>Loading...</div>;
  } else {
    const { firstName, lastName, email } = data as CurrUserType;
    return (
      <div className='mx-auto  w-[80%] flex flex-col items-center '>
        <div className='flex flex-col items-center  '>
          <img src={'./Img.png'} className='w-[7rem] h-[7rem] sm:w-[10rem] sm:h-[10rem]' alt='' />
          <h2 className='text-2xl font-semibold'>{firstName[0].toUpperCase()+firstName.slice(1)}</h2>
        </div>
        <div className='w-full rounded flex flex-col gap-4 p-4 '>
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
