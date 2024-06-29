export const urlPath = {
  explore: '/explore/page/:pageNumber',
  blogs: '/blogs',
  signin: '/signin',
  signup: '/signup',
  dashboard: '/dashboard',
  create: '/create',
  edit: '/edit',
  read: '/read',
  favourites: '/favourites',
};

export const expPathDefault = `/explore/page`;

export const apiHeaders = (token: string) => {
  return {
    'Content-Type': 'Application/json',
    authorization: `Bearer ${token}`,
  };
};

export const filteredBlogs = ({ blogs, filterStr }: FilteredBlogsType) => {
  const data = blogs?.filter(
    ({ title, description, author }) =>
      title.toLowerCase().includes(filterStr.toLowerCase()) ||
      description.toLowerCase().includes(filterStr.toLowerCase()) ||
      author.toLowerCase().includes(filterStr.toLowerCase())
  );
  return data;
};
