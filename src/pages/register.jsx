import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import Loader from '../components/loader';
import { Alert } from '../components/alert';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const Register = () => {
    let history = useHistory()
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [messageAlert, setMessageAlert] = useState({title: '', message: '', route: '', state: ''})
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        
    })

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);

        fetch('http://localhost:8000/users/createuser', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
              'Content-Type': 'application/json',
              'security-header': 'Vim365Aputek/2020.04'
          }
          })
          .then((response) => response.json())
          .then((json) => {
                
                if (!json.error) {
                    setMessageAlert({title: json.message, message: json.message, route: '/login', state: 'success'})
                    setShowAlert(true)
                    setSubmitting(false)
                    setTimeout(() => {
                        history.push("/login")
                    }, 2000);
                } else {
                    setMessageAlert({title: json.message, message: json.message, route: '/register', state: 'error'})
                    setShowAlert(true)
                    setSubmitting(false)
                }
          })
          .catch((error) => {
            setMessageAlert({title: 'Try again later', message: 'Try again later', route: '/register', state: 'error'})
            setShowAlert(true)
            setSubmitting(false)
        });
    }
    return (
        <div className="w-full text-center mx-auto bg-blue-500 h-screen">
            <div className="flex justify-center pt-10">
                <img src="./assets/img/logo-veo365.png" alt="" />
            </div>
            {showAlert && <Alert props={messageAlert} />}
            <div>
                <h1 className="text-4xl font-bold py-6 text-white">Register</h1>
            </div>
            <form onSubmit={handleSubmit}  className="max-w-md bg-white shadow-xl rounded-xl p-8 mx-auto relative overflow-hidden">
                {submitting && <Loader />}
                
                <div className="text-left">
                    <label htmlFor="" className="text-lg font-medium block">Usuario</label>
                    <input type="text" name="full_name" onChange={handleChange} className="h-14 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full rounded-xl mt-1 pl-4 bg-gray-200 hover:border-blue-600 border-2" />
                </div>
                <div className="text-left mt-4">
                    <label htmlFor="" className="text-lg font-medium block">Email</label>
                    <input type="email" name="email" onChange={handleChange} className="h-14 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full rounded-xl mt-1 pl-4 bg-gray-200 hover:border-blue-600 border-2" />
                </div>

                <div className="text-left mt-4">
                    <label htmlFor="" className="text-lg font-medium block">Contraseña</label>
                    <input type="password" name="password" onChange={handleChange} className="h-14 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full rounded-xl mt-1 pl-4 bg-gray-200 hover:border-blue-600 border-2" />
                </div>
                <div className="text-left mt-4">
                    <label htmlFor="" className="text-lg font-medium block">Confirmar Contraseña</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} className="h-14 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full rounded-xl mt-1 pl-4 bg-gray-200 hover:border-blue-600 border-2" />
                </div>

                <div className="text-left mt-4 flex justify-center w-full">
                    <button type="submit" className="px-10 w-full bg-blue-600 rounded-xl text-white py-4 text-xl tracking-wide font-medium">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Register