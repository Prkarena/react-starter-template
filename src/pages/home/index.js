import React, { useEffect } from 'react';
import './index.style.css';

const Home = (props) => {

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.type === 0) props.history.push('/editor');
        if (userData && userData.type === 1) props.history.push('/admin');
    }, [])

    return (
        <>
            <div id='welcome-div'>
                <h2>React.js</h2>
                <h3>Welcome to react starter template</h3>
            </div>
        </>
    )
}

export default Home;