import React, { useState, useEffect } from 'react';
import  { Redirect, useHistory } from 'react-router-dom'


const AlertSuccess = () => {
    return (
        <div>Hello Success</div>
    )
}

const Alert = ( { props } ) => {
    const [showAlert, setShowAlert] = useState(true)
    let history = useHistory()

    const gotoStep = (route) => {
        history.push(route)
    };

    useEffect(() => {
        setShowAlert(true)
    }, [props])

    const state = {
        success: {
            class: 'green',
            button: 'OKAY'
        },
        warning: {
            class: 'yellow',
            button: 'TRY AGAIN LATER'
        },
        error: {
            class: 'red',
            button: 'TRY AGAIN LATER'
        }
    }

    return (
        <div className={`fixed w-full h-full top-0 left-0 z-10 flex items-center justify-center ${!showAlert && 'hidden'}`}>
            <div className="absolute bg-black bg-opacity-20 w-full h-full top-0 left-0" onClick={() => setShowAlert(false)}></div>
            <div className="max-w-sm w-full bg-white rounded-xl shadow-2xl px-4 py-14 z-10 text-center relative">
                <div className="w-12 h-12 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center absolute -top-6 -right-6 cursor-pointer"
                onClick={() => setShowAlert(false)}>
                    <i className="fas fa-times"></i>
                </div>
                <h2 className={`font-extrabold text-4xl text-${state[props.state]['class']}-600`}>{props.title}</h2>
                <p className="text-gray-700 mt-4 px-8">{props.message}</p>
                <button type="button" className={`bg-${state[props.state]['class']}-500 px-8 mt-4 py-3 font-medium tracking-widest rounded-full text-white`} 
                onClick={() => gotoStep(props.route)}>{state[props.state]['button']}</button>
            </div>
        </div>
    )
}

const AlertError = () => {
    return (
        <div>Hello Error</div>
    )
}

export { AlertSuccess, Alert, AlertError }