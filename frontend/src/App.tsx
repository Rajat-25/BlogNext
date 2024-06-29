import { useSelector } from 'react-redux';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Blogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import Dashboard from './pages/Dashboard';
import EditBlog from './pages/EditBlog';
import Explore from './pages/Explore';
import ReadBlog from './pages/ReadBlog';
import Root from './pages/Root';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { RootState } from './store';
import { expPathDefault, urlPath } from './utils';
import Bookmark from './pages/Bookmark';

function App() {
  const { isUserLoggedIn } = useSelector(
    (state: RootState) => state.user_slice
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,

      children: [
        {
          index: true,
          element: <SignUp />,
        },
        {
          path: urlPath.signup,
          element: !isUserLoggedIn ? (
            <SignUp />
          ) : (
            <Navigate to={expPathDefault + '/1'} />
          ),
        },
        {
          path: urlPath.signin,
          element: !isUserLoggedIn ? (
            <SignIn />
          ) : (
            <Navigate to={expPathDefault + '/1'} />
          ),
        },

        {
          path: urlPath.explore,
          element: isUserLoggedIn ? (
            <Explore />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
        {
          path: urlPath.blogs,
          element: isUserLoggedIn ? (
            <Blogs />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
        {
          path: urlPath.dashboard,
          element: isUserLoggedIn ? (
            <Dashboard />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
        {
          path: urlPath.create,
          element: isUserLoggedIn ? (
            <CreateBlog />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
        {
          path: urlPath.read,
          element: isUserLoggedIn ? (
            <ReadBlog />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
        {
          path: urlPath.edit,
          element: isUserLoggedIn ? (
            <EditBlog />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
        {
          path: urlPath.favourites,
          element: isUserLoggedIn ? (
            <Bookmark />
          ) : (
            <Navigate to={urlPath.signin} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
