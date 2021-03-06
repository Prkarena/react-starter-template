import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './index.style.css';
import { withRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Copyright from '../../copyright';

const Layout = (props) => {

    const data = localStorage.getItem('userData');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(data);
        if (userData) setIsLoggedIn(true)
    }, [data])
    
    return (
        <>
            {
                isLoggedIn ?
                    <>
                        <Button
                            id='login-btn'
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                localStorage.removeItem('userData');
                                setIsLoggedIn(false);
                                props.history.push('/');
                            }}
                        >
                            Logout
                        </Button>
                        {props.children}
                    </>
                    :
                    <>
                        <Button
                            id='login-btn'
                            variant="contained"
                            color="primary"
                            onClick={() => props.history.push('/login')}
                        >
                            Login
                        </Button>
                        <div style={{marginTop:50}}>
                            {props.children}
                        </div>
                        <Box mt={10}>
                            <Copyright />
                        </Box>
                    </>
            }
        </>
    )
}

export default withRouter(Layout);