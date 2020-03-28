import React, { useState, useEffect } from "react";
import { Route, Redirect, withRouter } from 'react-router-dom';
import { auth } from '../../../services/account';
import Loader from "../../loader";
const Auth = ({ component: Component, ...rest }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));

  useEffect(() => {
    if (userData) {
      if (rest.path === '/editor' && userData.type !== 0 || rest.path === '/admin' && userData.type !== 1) {
        return rest.history.push('/');
      }
      auth(userData.token)
        .then(res => {
          if (res.data.success === 1) {
            setIsAuthenticated(true);
            setIsLoading(false);
          }
        })
        .catch(err => {
          if (err.response && err.response.data) {
            localStorage.removeItem('userData');
            alert(err.response.data.message);
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        })
    } else {
      return rest.history.push('/');
    }
  }, [rest.path, userData])

  return (
    !isLoading ?
      <Route {...rest} render={(props) => (
        isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
      :
      <div style={{ color: 'blue' }}>
        <Loader />
      </div>
  )
}
export default withRouter(Auth);