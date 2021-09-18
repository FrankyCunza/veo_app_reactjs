import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
const PageStep = () => {
    const location = useLocation();
    return (
        <div>
            {console.log(location.state.data)}
        </div>
    );
};

export default PageStep;