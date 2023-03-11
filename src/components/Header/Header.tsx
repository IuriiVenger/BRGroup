import { Button } from '@mui/material';

import { Link, NavLink, useLocation } from 'react-router-dom';

import classes from './Header.module.scss';

import gitHubLogo from '@/assets/icons/github.svg';

const Header = () => {
  const location = useLocation();
  const isNewsPage = location.pathname.includes('news');
  return (
    <header className={classes.mainHeader}>
      <nav>
        <NavLink className={navData => (navData.isActive ? classes.active : '')} to='/main'>
          Main
        </NavLink>
        <Link className={isNewsPage ? classes.active : ''} to='/main#news-list'>
          Hacker News
        </Link>
      </nav>
      <Button
        variant='contained'
        color='secondary'
        className={classes.headerButton}
        href='https://github.com/IuriiVenger/IuriiVenger'
        target='__blank'
      >
        <img src={gitHubLogo} alt='github'></img>
        <p>Iurii Venger on GitHub</p>
      </Button>
    </header>
  );
};

export default Header;
