import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { RootState, logOutUser } from '../store';
import { expPathDefault, urlPath } from '../utils';
import Button from './Button';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isUserLoggedIn } = useSelector(
    (state: RootState) => state.user_slice
  );

  const logOutHandler = () => {
    dispatch(logOutUser());
    navigate(urlPath.signin);
  };

  const navItems: NavItemsType[] = [
    {
      title: 'Home',
      to: urlPath.signup,
      include: isUserLoggedIn == false,
      key: 'home_nb',
    },
    {
      title: 'Sign In',
      to: urlPath.signin,
      include: isUserLoggedIn == false,
      key: 'signin_nb',
    },

    {
      title: 'Explore',
      to: expPathDefault + '/1',
      include: isUserLoggedIn == true,
      key: 'explore_nb',
    },
    {
      title: 'Blogs',
      to: urlPath.blogs,
      include: isUserLoggedIn == true,
      key: 'blogs_nb',
    },

    {
      title: 'Favourites',
      include: isUserLoggedIn == true,
      key: 'favourites_nb',
      to: '/favourites',
    },
    {
      title: 'Dashboard',
      to: urlPath.dashboard,
      include: isUserLoggedIn == true,
      key: 'dashboard_nb',
    },
    {
      title: 'Log Out',
      include: isUserLoggedIn == true,
      key: 'logout_nb',
      to: '',
    },
  ];

  const renderedItems = navItems
    .filter(({ include }) => include == true)
    .map(({ title, to, key }) => {
      if (title !== 'Log Out') {
        return (
          <Link to={to} key={key}>
            <Button
              text={title}
              btnVariant='plain'
              extraClass='border px-4 py-2   text-lg '
            />
          </Link>
        );
      } else {
        return (
          <Fragment key={key}>
            <Button
              extraClass='text-white px-3 py-2 text-lg'
              btnVariant='danger'
              onClickHandler={logOutHandler}
              text={title}
            />
          </Fragment>
        );
      }
    });

  return (
    <div className='flex p-2 justify-between items-center'>
      <div className='text-xl font-semibold px-6'>BlogNext</div>
      <div className='px-2 flex gap-4 items-center '>{renderedItems}</div>
    </div>
  );
};

export default NavBar;
