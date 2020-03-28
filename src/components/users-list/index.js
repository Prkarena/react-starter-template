import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import { getUserData } from '../../services/account';
import ProfileModal from '../modal';
import Loader from '../loader';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function UsersList(props) {
    const classes = useStyles();

    const { data } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));

    const _handleGetProfileData = (data) => {
        setUserId(data.userId);
        setIsLoading(true)
        getUserData(data) // data : { token : '' , userId: '' }
            .then(res => {
                if (res.data.success === 1) {
                    setIsLoading(false);
                    setUserProfile(res.data.user)
                    setOpen(true);
                }
            })
            .catch(err => {
                setIsLoading(false);
                if (err.response && err.response.data) {
                    alert(err.response.data.message);
                }
            })
    }

    return (
        <List dense className={classes.root}>
            <>
                <ProfileModal data={userProfile} open={open} setOpen={setOpen} />
                {data.map(value => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <ListItem key={value.email}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${value.email}`}
                                />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${value.email}`} />
                            <ListItemSecondaryAction>
                                <Button
                                    onClick={() => _handleGetProfileData({ token: userData.token, userId: value._id })}
                                    color="primary" >
                                    {
                                        isLoading && userId === value._id
                                            ? <div style={{ color: 'blue' }}>
                                                <Loader />
                                            </div>
                                            : <VisibilityIcon />
                                    }
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </>
        </List>
    );
}