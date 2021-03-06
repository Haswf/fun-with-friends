import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeRounded from '@material-ui/icons/HomeRounded';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import { useDispatch, useSelector } from 'react-redux';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';
import NavProfile from './NavProfile';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import UserTitle from './UserTitle';
import { toggleDarkMode } from '../../actions/index';

const useStyles = makeStyles(theme => ({
  navBar: {
    flexGrow: 1,
    background: '#3e4360',
    position: 'relative',
    maxHeight: '63px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const dark = useSelector(store => store.focusView.dark);
  return (
    <>
      <AppBar position='static' className={classes.navBar}>
        <Toolbar>
          <IconButton component={Link} to='/' edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <HomeRounded />
          </IconButton>
          <IconButton component={Link} to='/circles' edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <GroupIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(toggleDarkMode())} edge='start' className={classes.menuButton} color='inherit'>
            {dark ? <WbSunnyOutlinedIcon /> : <WbSunnyRoundedIcon />}
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Artifact Register
          </Typography>
          <SignupButton />
          <LoginButton />
          <UserTitle />
          <NavProfile />
        </Toolbar>
      </AppBar>
    </>
  );
}
