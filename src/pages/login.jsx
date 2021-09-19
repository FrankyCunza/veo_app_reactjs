import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import Loader from '../components/loader';
const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const Login = () => {
    let history = useHistory()
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

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
        const param = {
            user: formData.user,
            password: formData.password,
            social: false
        }

        axios({
            method: 'get',
            url: 'https://gateway.vim365.com/users/checkuser',
            headers: {
                'security-header': 'Vim365Aputek/2020.04'
            },
            params: param
        }).then(data => {
            console.log(data.data)
            for (const [key, value] of Object.entries(data.data)) {
                localStorage.setItem(key, value)
            }
            history.push("/home")
            // return <Redirect to='/daily'  />
        })
    }
    return (
        <div className="w-full text-center mx-auto bg-blue-500 h-screen">
            <div>
                <h1 className="text-4xl font-bold py-8 text-white">Iniciar sesión</h1>
            </div>
            <form onSubmit={handleSubmit}  className="max-w-md bg-white shadow-xl rounded-xl p-8 mx-auto relative overflow-hidden">
                {submitting && <Loader />}
                <div className="text-left">
                    <label htmlFor="" className="text-lg font-medium block">Usuario</label>
                    <input type="text" name="user" onChange={handleChange} className="h-14 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full rounded-xl mt-1 pl-4 bg-gray-200" />
                </div>

                <div className="text-left mt-4">
                    <label htmlFor="" className="text-lg font-medium block">Contraseña</label>
                    <input type="password" name="password" onChange={handleChange} className="h-14 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full rounded-xl mt-1 pl-4 bg-gray-200" />
                </div>

                <div className="text-left mt-4 flex justify-center w-full">
                    <button type="submit" className="px-10 w-full bg-blue-600 rounded-xl text-white py-4 text-xl tracking-wide font-medium">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Login