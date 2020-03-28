import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ProfileModal from '../../components/modal';
import Title from '../../components/title';
import { getUserData } from '../../services/account';
import Loader from '../../components/loader';

const Editor = (props) => {

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));

    const _handleGetProfileData = (data) => {
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
        <>
            <div>
                <Title>
                    Editor
                </Title>
                <ProfileModal data={userProfile} open={open} setOpen={setOpen} />
                <div>
                    <Button
                        id='modal-btn'
                        variant="contained"
                        color="secondary"
                        onClick={() => _handleGetProfileData({ token: userData.token, userId: userData.id })}
                    >
                        {
                            isLoading
                                ? <div style={{ color: 'white' }}>
                                    <Loader />
                                </div>
                                : 'Profile'
                        }
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Editor;