
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Skeleton from '../components/skeleton';
import { useForm } from "react-hook-form";
import Loader from '../components/loader';
import { Alert } from '../components/alert';
import  { Redirect, useHistory } from 'react-router-dom'
const AuxiliaryControls = () => {
    let history = useHistory()
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState({
        "error": false,
        "form": [
            {
                "title": "Gestantes",
                "icon": "../../assets/svgs/declaration-diary-icon.svg",
                "form": [
                    {
                        "type": "title",
                        "title": "Información adicional"
                    },
                    {
                        "type": "sub_title",
                        "title": "Bloque 1"
                    },
                    {
                        "type": "field_text",
                        "title": "Nombre",
                        "name": "name"
                    },
                    {
                        "type": "field_checkboxes",
                        "title": "Checkboxes",
                        "name": "risk_factors",
                        "data": [
                            {
                                "title": "Asma",
                                "icon": "../../assets/svgs/declaration-diary-icon.svg",
                                "value": false
                            },
                            {
                                "title": "Tos",
                                "icon": "../../assets/svgs/icon-2.svg",
                                "value": false
                            },
                            {
                                "title": "Gripe",
                                "icon": "../../assets/svgs/icon-4.svg",
                                "value": false
                            }
                        ]
                    },
                    {
                        "type": "field_text",
                        "title": "Apellidos",
                        "name": "last_name"
                    },
                    {
                        "type": "field_date",
                        "title": "Date of birth",
                        "name": "date_birth"
                    },
                    {
                        "type": "field_select",
                        "icon": "worker",
                        "title": "Country",
                        "name": "country",
                        "data": [
                            {
                                "label": "Peru",
                                "value": "Peru"
                            },
                            {
                                "label": "Brasil",
                                "value": "Brasil"
                            },
                            {
                                "label": "España",
                                "value": "España"
                            },
                            {
                                "label": "Colombia",
                                "value": "Colombia"
                            },
                            {
                                "label": "Argentina",
                                "value": "Argentina"
                            }
                        ]
                    },
                    {
                        "type": "carousel",
                        "icon": "worker",
                        "title": "Entrada",
                        "name": "worker",
                        "data": [
                            {
                                "icon": "covid-19",
                                "title": "Lorem ipsum sit",
                                "description": "Lorem Ipsum1"
                            },
                            {
                                "icon": "worker",
                                "title": "Lorem ipsum",
                                "description": "Lorem Ipsum2"
                            }
                        ]
                    }
                ]
            },
            {
                "title": "Asma",
                "icon": "../../assets/svgs/icon-2.svg",
                "form": []
            },
            {
                "title": "Tos",
                "icon": "../../assets/svgs/icon-4.svg",
                "form": []
            }
        ]
    })

    useEffect(() => {
        setLoading(false)
    }, [])

    const goToForm = (item) => {
        history.push("/auxiliaryControlsForm", {data: item})
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Auxiliary Controls</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6">
                {isLoading &&<Skeleton quantity={4} />}
                {data.form.length>0 && data.form.map((el, i) => {
                    return (
                        <div className="w-full bg-white rounded-xl p-6 shadow hover:shadow-xl mt-4 flex cursor-pointer relative" key={'auxiliary'+i} onClick={() => goToForm(el)}>
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <img src={`./assets/svgs/td3.svg`} alt="" className="w-15 max-h-16" />
                            </div>
                            <h2 className="pt-4 pl-4 text-xl">{el.title}</h2>
                            <div className="w-12 h-12 bg-gray-50 hover:bg-gray-200 flex items-center justify-center absolute top-9 rounded-full right-4">
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AuxiliaryControls