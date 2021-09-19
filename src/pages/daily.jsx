import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { HHMMSS, dateYYYYMMDD } from './../utils/utils'
import Traffic from '../components/daily_traffic';
import Skeleton from '../components/skeleton';
import { useForm } from "react-hook-form";
import Loader from '../components/loader';
import { Alert } from '../components/alert';


const Daily = () => {
    const [boxes, setBoxes] = useState([]);
    const [range, setRange] = useState([]);
    const [value, setValue] = useState(0);
    const [submitting, setSubmitting] = useState(false)
    const [trafficResult, setTrafficResult] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [messageAlert, setMessageAlert] = useState({title: '', message: '', route: '', state: ''})
    const [showAlert, setShowAlert] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    useEffect(() => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: 'daily-test'
        };

        axios({
            method: 'get',
            url: 'https://gateway.vim365.com/checkcards/cards',
            headers: {
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            params: param
        }).then(response => {
            setBoxes(response.data.data)
            setRange(response.data.range)
            setLoading(false)
            // for (const item of response.data.data) {
            //     setGetData((s) => [...s, {"code": item.code, "response": item.selected}])
            // }
        }, [])
    }, []);

    

    const send = () => {
        setSubmitting(true)
        let traffic = ''
        if (value === range['min_low_range'] || value <= range['max_low_range']) {
            traffic = 'green'
        } else if (value === range['min_med_range'] || value <= range['max_med_range']) {
            traffic = 'yellow'
        } else if (value === range['min_hig_range'] || value <= range['max_hig_range']) {
            traffic = 'red'
        } else {}
        let local = {}
        for (const [key, value] of Object.entries(localStorage)) {
            local[key] = value
        }

        let data = {
            ...local,
            "form": {
                "code": "DT2005",
                "traffic": traffic,
                "status": true,
                "version": 4.00,
                "answers": []
            },
            "date": dateYYYYMMDD(),
            "hour": HHMMSS(),
        }
        for (const item of boxes) {
            data['form']['answers'].push({code: item.code, response: item.selected})
        }
        // setSendData({...local, ...data})
        // Send Data
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: 'daily-test'
        };

        axios({
            method: 'post',
            url: 'https://gateway.vim365.com/saveform/saveform',
            headers: {
                'Content-Type': 'application/json',
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            data: JSON.stringify(data)
        })
        .then((response) => {
            if (response.data.error) {
                setSubmitting(false)
                setMessageAlert({title: response.data.error, message: response.data.error, route: '/home', state: 'error'})
            } else {
                setSubmitting(false)
                setTrafficResult(traffic)
            }
            setShowAlert(true)
        }).catch(function (error) {
            setSubmitting(false)
            setMessageAlert({title: 'Try again later', message: 'Try again later', route: '/home', state: 'error'})
        })
    }

    const updateData = (data, type) =>{
        console.log(data)
        // return false
        if (data.checked == true) {
            setValue(value+parseInt(data.value))
        } else {
            setValue(value-parseInt(data.value))
        }
        const NewArray = boxes.map(item => {
            if (item.code == data.code){
                item.selected = data.checked
            }
            return item
        })
        setBoxes(NewArray)
    }
    
    return (
        <div className="max-w-3xl mx-auto"> 
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Declaración diaria</h1>
            </div>
            {trafficResult ? <Traffic name={trafficResult} /> : ''}
            {showAlert && <Alert props={messageAlert} />}
            <div className="relative">
                {submitting && <Loader />}
                {!trafficResult ? 
                    <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {isLoading ? 
                            <Skeleton quantity={16} /> : 
                            boxes.map(post => {
                                if (post.type == 'check')
                                    return <div key={post.code} className={`bg-white py-6 relative hover:shadow-lg border-2 cursor-pointer rounded-2xl border-solid border-gray-200 flex items-center justify-center flex-col ${post.selected ? 'bg-blue-600 text-white' : ' text-gray-700'}`}>
                                                <img src={`./assets/svgs/${post.image}.svg`} alt="" className="w-15 max-h-16" />
                                                <p className="leading-5 px-2 mt-3 font-medium text-lg text-center">{post.title}</p>
                                                <input type="checkbox" 
                                                    data-id = {post.code}
                                                    value = {post.value}
                                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                                    checked = {post.selected}
                                                    onChange = {
                                                        (e) => {updateData({value: post.value, checked: e.target.checked, code: post.code}, post.type)}
                                                    }
                                                />
                                            </div>
                                else if (post.type == 'question')
                                    return <div key={post.code} className={`bg-white col-span-2 md:col-span-4 py-6 px-8 relative hover:shadow-lg border-2 cursor-pointer rounded-2xl border-solid border-gray-200 flex flex-col`}>
                                                <img src={`./assets/svgs/${post.image}.svg`} alt="" className="w-15 max-h-16" />
                                                <p className="leading-snug px-2 mt-3 font-medium text-lg text-left">{post.text}</p>
                                                <div className="mt-4 flex">
                                                    <button type="button" className={`px-12 py-3 bg-blue-600 text-white rounded-full w-max ${post.selected==false ? '' :'opacity-20'}`} 
                                                    onClick={() => {updateData({value: post.value, checked: false, code: post.code}, post.type)}}>No</button>

                                                    <button type="button" className={`px-12 py-3 bg-blue-600 text-white rounded-full w-max ml-2 ${post.selected ? '' :'opacity-20'}`}
                                                    onClick={() => {updateData({value: post.value, checked: true, code: post.code}, post.type)}}>Si</button>
                                                </div>
                                            </div>
                            })
                        }
                        
                    </div>
                    <div className="w-full flex justify-center mt-6">
                        <button type="button" className="rounded-lg bg-blue-500 py-4 px-8 text-white shadow-md font-semibold text-xl" onClick={send}>Enviar</button>
                    </div>
                    </>
                : ''}
                
            </div>
        </div>
    )
}

export default Daily