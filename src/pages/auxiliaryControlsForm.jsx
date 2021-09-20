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
        for (let i=0; i<data.form.length; i++) {
            if (data.form[i].type == 'field_text' || data.form[i].type == 'field_date' || data.form[i].type == 'field_select') {
                setValue(data.form[i].title, '')
            } else if (data.form[i].type == 'field_checkboxes') {
                let collectData = {}
                data.form[i].data.forEach((el, s) => {
                    collectData[el.title] = el.value
                })
                setValue(data.form[i].title, collectData)
            } else if (data.form[i].type == 'carousel') {
                let collectData = {}
                data.form[i].data.forEach((el, s) => {
                    collectData[el.title] = null
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
                        } else if (el.type == "field_checkboxes") {
                            return (
                                <div className="w-full">
                                    <p>{el.title}</p>
                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        {el.data.map((item, index) => {
                                            return (
                                                <div className={`border-2 border-solid border-gray-400 relative p-12 rounded-xl ${watch(`${el.title}.${item.title}`, 'value')==true ? 'bg-blue-500' : 'bg-white'}`}>
                                                    <input type="checkbox"  checked={watch(`${el.title}`) ? watch(`${el.title}.${item.title}`) : false} 
                                                    onChange={(e) => {setValue(`${el.title}.${item.title}`, e.target.checked)}} className="absolute opacity-0 top-0 left-0 w-full h-full" />
                                                    <p>{item.title}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        } else if (el.type == "carousel") {
                            return (
                                <div className="w-full">
                                    <p>{el.title}</p>
                                    <div className="bg-white shadow-sm overflow-hidden rounded-xl border-2 border-solid border-blue-600 mt-6">
                                        <div className="flex">
                                            {el.data.map((item, index) => {
                                                return (
                                                    <div className="w-full flex-shrink-0 p-12">
                                                        <h2>{item.title}</h2>
                                                        <p>{item.description}</p>
                                                        <div className="mt-6 flex justify-center">
                                                            <button type="button" className={`bg-blue-600 rounded-full py-3 p-10 text-white ${watch(`${el.title}.${item.title}`, 'value')==false ? '' : 'opacity-20'}`}
                                                            onClick={() => {setValue(`${el.title}.${item.title}`, false)}}>NO</button>
                                                            <button type="button" className={`bg-blue-600 rounded-full py-3 p-10 text-white ml-2 ${watch(`${el.title}.${item.title}`, 'value')==true ? '' : 'opacity-20'}`}
                                                            onClick={() => {setValue(`${el.title}.${item.title}`, true)}}>SI</button>
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <button className={`mt-6 bg-green-500 py-3 px-6 rounded-full`}>NEXT</button>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
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