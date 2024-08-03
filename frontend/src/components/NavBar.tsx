import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, logOutUser } from '../store';
import { expPathDefault, urlPath } from '../utils';
import Button from './Button';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<Boolean>(false);

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
  ];

  const renderedItems = navItems
    .filter(({ include }) => include == true)
    .map(({ title, to, key }) => {
      return (
        <Link to={to} key={key} className={`${isOpen ? 'block' : ''}`}>
          <Button
            text={title}
            btnVariant='plain'
            extraClass={`${
              isOpen ? 'py-1' : 'border  px-4 py-2  '
            }   text-xs md:text-lg `}
          />
        </Link>
      );
    });

  return (
    <div className='flex p-2 justify-between items-center'>
      <div className='text-base md:text-xl font-semibold px-6'>BlogNext</div>
      {!isOpen && (
        <Bars3BottomRightIcon
          onClick={() => setIsOpen(true)}
          className='block md:hidden w-[1.5rem] h-[1.5rem]'
        />
      )}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } md:flex  px-2  gap-2 lg:gap-4 items-center `}
      >
        {isOpen && (
          <XMarkIcon
            onClick={() => setIsOpen(false)}
            className='md:hidden text-red-700 w-[1.1rem] h-[1.1rem]'
          />
        )}
        {renderedItems}
        {isUserLoggedIn && (
          <Button
            extraClass='text-white px-4 py-2 text-xs md:text-lg'
            btnVariant='danger'
            onClickHandler={logOutHandler}
            text={'Log Out'}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
