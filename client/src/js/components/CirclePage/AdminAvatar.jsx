/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { IconButton, ListItemAvatar, Avatar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCircleAdmin } from '../../actions/circle';

const AdminAvatar = ({ props }) => {
  const { member } = props;
  const { circle } = props;
  const { adminPerms } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = useSelector(store => store.auth.token);
  const dispatch = useDispatch();

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'options' : undefined;

  return (
    <div>
      <ListItemAvatar>
        {adminPerms ?
          <Avatar onClick={handleClick}>{member.username.slice(0, 2)}</Avatar> :
          <Avatar>{member.username.slice(0,2)}</Avatar>
        }
      </ListItemAvatar>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <IconButton onClick={() => dispatch(deleteCircleAdmin(member.id, circle, token))}>
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default AdminAvatar;
