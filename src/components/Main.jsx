import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const Main = () => {
    return (
        <ul>
            <BrowserRouter>
            <li><Link to="/profile">Profile</Link></li>
            </BrowserRouter>
        </ul>
    )
}

export default Main