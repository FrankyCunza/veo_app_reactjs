import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Skeleton from '../components/skeleton';
import { useForm } from "react-hook-form";
import Loader from '../components/loader';
import { Alert } from '../components/alert';
import  { Redirect, useHistory, useLocation } from 'react-router-dom'
const AuxiliaryControlsForm = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    let history = useHistory()
    const location = useLocation();
    const [data, setData] = useState(location.state.data)

    useEffect(() => {
        let form = {
            "Nombre": "",
            "Apellidos": "",
            "Checkboxes": {
                "Asma": false,
                "Tos": false
            }
        }
        for (let i=0; i<data.form.length; i++) {
            if (data.form[i].type == 'field_text' || data.form[i].type == 'field_date' || data.form[i].type == 'field_select') {
                setValue(data.form[i].title, '')
            } else if (data.form[i].type == 'field_checkboxes') {
                let collectData = {}
                data.form[i].data.forEach((el, s) => {
                    collectData[el.title] = ''
                })
                setValue(data.form[i].title, collectData)
            }
        }
    }, [])

    const onSubmit = data => console.log(data);

    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <a onClick={() => history.goBack()} className="text-blue-500 text-left pt-4 flex cursor-pointer">
                    <p>Atrás</p>
                </a>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">{data.title}</h1>
            </div>
            <form className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
                {
                    data.form.map((el, i) => {
                        if (el.type == "field_text") {
                            return (
                                <div className="w-full">
                                    <p>{el.title}</p>
                                    <input type="text" name="" id="" {...register(el.title)}
                                    className='w-full px-4 py-3 rounded focus:outline-none focus:ring-2 from-blue-600' />
                                </div>
                            )
                        } else if (el.type == "field_date") {
                            return (
                                <div className="w-full">
                                    <p>{el.title}</p>
                                    <input type="date" name="" id="" {...register(el.title)}
                                    className='w-full px-4 py-3 rounded focus:outline-none focus:ring-2 from-blue-600' />
                                </div>
                            )
                        } else if (el.type == "field_select") {
                            return (
                                <div className="w-full">
                                    <p>{el.title}</p>
                                    <select name="" id="" {...register(el.title)}
                                    className='w-full px-4 py-3 rounded focus:outline-none focus:ring-2 from-blue-600'>
                                        <option value="">Seleccionar</option>
                                        {el.data.map((item, index) => {
                                            return (
                                                <option value={item.label} >{item.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )
                        }
                    })
                }
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default AuxiliaryControlsForm