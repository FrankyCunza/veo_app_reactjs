import React, { useState, useEffect, setState, useReducer } from 'react';
import Loader from './loader';
import { Alert } from '../components/alert';
import axios from 'axios'

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const RegisterOnceTime = ( { show } ) => {
    const [showModal, setShowModal] = useState(true)
    const [formData, setFormData] = useReducer(formReducer, {});
    const [isLoading, setLoading] = useState(false)
    const [messageAlert, setMessageAlert] = useState({title: '', message: '', route: '', state: ''})
    const [showAlert, setShowAlert] = useState(false)

    const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData)
        if (formData.document) {
            console.log(true)
            setLoading(true)
            axios({
                method: 'get',
                url: 'http://localhost:8000/users/checkdoc',
                headers: {
                    'security-header': 'Vim365Aputek/2020.04'
                },
                params: {
                    document: formData.document
                }
            }).then(data => {
                console.log(data.data)
                if (!data.data.error) {
                    setMessageAlert({title: data.data.message, message: data.data.message, route: '/home', state: 'error'})
                    setShowAlert(true)
                } else {
                    setMessageAlert({title: data.data.message, message: data.data.message, route: '/home', state: 'warning'})
                    setShowAlert(true)
                }
                setLoading(false)
                setShowModal(false)
            }).catch(err => {
            })
        } else {
            console.log(false)
        }
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center pointer-events-none">
            {showAlert && <Alert props={messageAlert} />}
            {showModal && <>
                <div className="absolute w-full h-full bg-black bg-opacity-30 pointer-events-auto" onClick={() => setShowModal(false)}></div>
                <div className="max-w-2xl w-full p-12 rounded-xl bg-white z-20 relative overflow-hidden pointer-events-auto">
                    {isLoading && <Loader />}
                    <h2 className="text-2xl mb-3 font-medium">Ingresa tu DNI para registrarte a una empresa</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="document" onChange={handleChange} className="py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-xl border-2 border-solid border-gray-300 w-full" />
                        <button type="submit" className="py-4 px-7 text-lg rounded-xl bg-blue-600 text-white mt-4">Enviar</button>
                    </form>
                </div>
            </>}
        </div>
    )
}

export default RegisterOnceTime