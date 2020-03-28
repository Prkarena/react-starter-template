import React, { useState, useEffect } from 'react';
import Title from '../../components/title';
import UsersList from '../../components/users-list';
import { getUsersList } from '../../services/dashboard';
import Loader from '../../components/loader';

const Admin = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [usersList, setUsersList] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        // get users list  
        setIsLoading(true)
        getUsersList(userData.token) // token
            .then(res => {
                if (res.data.success === 1) {
                    setIsLoading(false);
                    setUsersList(res.data.users)
                }
            })
            .catch(err => {
                setIsLoading(false);
                if (err.response && err.response.data) {
                    alert(err.response.data.message);
                }
            })
    }, [])

    return (
        <>
            <Title>
                Admin
            </Title>
            {isLoading ? <div style={{ color: 'blue' }}><Loader /></div> : ''}
            {
                usersList.length > 0
                    ? <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <UsersList
                            data={usersList}
                        />
                    </div>
                    : !isLoading
                        ? <h4>Users Not Found.</h4>
                        : ''
            }

        </>
    )
}

export default Admin;