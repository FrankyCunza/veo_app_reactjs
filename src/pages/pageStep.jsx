import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'



const pageStep = (props) => {

    return (
        <div>
            {console.log(props.location.state.data)}
        </div>
    );
};

export default pageStep;