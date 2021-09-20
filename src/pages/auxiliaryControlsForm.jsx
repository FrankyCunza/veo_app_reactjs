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

    const animateSlide = (id, index) => {
        document.getElementById(`${id}`).style.transform = `translateX(-${index}00%)`
    }

    return (
        <div className="max-w-3xl mx-auto bg-white px-12 rounded-xl shadow-xl my-6 py-6">
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
                                    <p className="font-medium text-lg">{el.title}</p>
                                    <input type="text" name="" id="" {...register(el.title)}
                                    className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50' />
                                </div>
                            )
                        } else if (el.type == "field_date") {
                            return (
                                <div className="w-full">
                                    <p className="font-medium text-lg">{el.title}</p>
                                    <input type="date" name="" id="" {...register(el.title)}
                                    className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50' />
                                </div>
                            )
                        } else if (el.type == "field_select") {
                            return (
                                <div className="w-full">
                                    <p className="font-medium text-lg">{el.title}</p>
                                    <select name="" id="" {...register(el.title)}
                                    className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50'>
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
                                    <p className="font-medium text-lg">{el.title}</p>
                                    <div className="grid grid-cols-4 gap-4 mt-2">
                                        {el.data.map((item, index) => {
                                            return (
                                                <div className={`border border-solid text-center transition duration-200 ease-linear relative px-12 py-14 rounded-xl shadow ${watch(`${el.title}.${item.title}`, 'value')==true ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-400'}`}>
                                                    <input type="checkbox" checked={watch(`${el.title}`) ? watch(`${el.title}.${item.title}`) : false} 
                                                    onChange={(e) => {setValue(`${el.title}.${item.title}`, e.target.checked)}} className="absolute cursor-pointer opacity-0 top-0 left-0 w-full h-full" />
                                                    <p className="text-lg tracking-wide font-medium">{item.title}</p>
                                                    {watch(`${el.title}.${item.title}`)==true && <div className="w-7 h-7 text-xs bg-black bg-opacity-30 rounded-full flex items-center justify-center absolute right-3 top-3 text-white">
                                                        <i className="fas fa-check"></i>
                                                    </div>}
                                                    
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        } else if (el.type == "carousel") {
                            return (
                                <div className="w-full">
                                    <p className="font-medium text-lg">{el.title}</p>
                                    <div className="bg-white shadow-xl overflow-hidden rounded-2xl border-2 border-solid border-blue-600 mt-2">
                                        <div className="flex transition duration-500 ease-in-out" id={el.title}>
                                            {el.data.map((item, index) => {
                                                return (
                                                    <div className="w-full flex-shrink-0 px-12 py-16 relative flex items-center justify-center">
                                                        {index>0 && <div className="w-12 h-12 cursor-pointer rounded-full absolute top-5 left-5 bg-gray-200 flex items-center justify-center"
                                                        onClick={() => {animateSlide(el.title, index-1)}}>
                                                            <i className="fas fa-chevron-left"></i>
                                                        </div>}
                                                        <div className="flex items-center justify-center flex-col">
                                                            <div className="w-28 h-28 mb-6 rounded-full flex items-center justify-center bg-gray-100">
                                                                <img src={'./assets/svgs/logout-icon.svg'} alt="" className="w-14 max-h-16" />
                                                            </div>
                                                            <h2 className="text-2xl font-medium">{item.title}</h2>
                                                            <p className="text-lg mt-4">{item.description}</p>
                                                            <div className="mt-6 flex justify-center">
                                                                <button type="button" className={`tracking-wide font-medium border border-solid rounded-full py-3 pl-5 pr-12 border-blue-600 ${watch(`${el.title}.${item.title}`)==false ? 'bg-blue-600 text-white' : 'border-white'}`}
                                                                onClick={() => {setValue(`${el.title}.${item.title}`, false)}}><i className={`fas fa-check opacity-0 mr-4 ${watch(`${el.title}.${item.title}`)==false && 'opacity-100'}`}></i>NO</button>
                                                                <button type="button" className={`tracking-wide font-medium border border-solid rounded-full py-3 pl-5 pr-12 border-blue-600 ml-2 ${watch(`${el.title}.${item.title}`)==true ? 'bg-blue-600 text-white' : 'border-white'}`}
                                                                onClick={() => {setValue(`${el.title}.${item.title}`, true)}}><i className={`fas fa-check opacity-0 mr-4 ${watch(`${el.title}.${item.title}`)==true && 'opacity-100'}`}></i>SI</button>
                                                            </div>
                                                            {index < el.data.length-1 && <div className="flex justify-center">
                                                                <button className={`mt-6 py-3 px-12 text-white rounded-full ${watch(`${el.title}.${item.title}`)==null ? 'bg-gray-500' : 'bg-green-500'}`} onClick={() => {animateSlide(el.title, index+1)}}>NEXT</button>
                                                            </div>}
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
                <button type="submit" className="w-full bg-blue-600 text-white py-5 tracking-wider text-xl rounded-full mt-4">Enviar</button>
            </form>
        </div>
    )
}

export default AuxiliaryControlsForm