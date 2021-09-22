import React, { useReducer, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../components/skeleton';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import { Alert } from '../components/alert';
const Informed = () => {
    let history = useHistory()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [messageAlert, setMessageAlert] = useState({title: '', message: '', route: '', state: ''})
    const [showAlert, setShowAlert] = useState(false)
    useEffect(() => {
        getData()
    }, [])

    const gotoNotice = (item) => {
        history.push("/informedEntries", {data: item})
    };

    const getData = async () => {
        try {
            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')
            const company_id = localStorage.getItem('company_id')
            const end_point = localStorage.getItem('end_point')
            const param = {
                company_id: localStorage.getItem('company_id'),
                end_point: localStorage.getItem('end_point'),
                page: 'profileForm'
            };
            axios({
                method: 'get',
                url: `http://localhost:8000/news/api/v1.0/get-news`,
                headers: {
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: localStorage.getItem('token'),
                    id: localStorage.getItem('id')
                },
                params: param
              }).then(response => {
                setData(response.data.data)
                setLoading(false)
            }, []). catch((error) => {
                setMessageAlert({title: 'Try again later', message: 'Try again later', route: '/home', state: 'error'})
                setShowAlert(true)
            })
          } catch(e) {
            alert(e)
        }
    }
    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                {showAlert && <Alert props={messageAlert} />}
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Noticias</h1>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6">
                    {isLoading &&<Skeleton quantity={4} />}
                    {data.length>0 && data.map((el, i) => {
                        return (
                            <div className="w-full bg-white rounded-xl p-6 shadow hover:shadow-xl mt-4 flex cursor-pointer relative" key={'notice'+i} onClick={() => gotoNotice(el)}>
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                    <img src={`./assets/svgs/td3.svg`} alt="" className="w-15 max-h-16" />
                                </div>
                                <h2 className="pt-4 pl-4 text-xl">{el.name}</h2>
                                <div className="w-12 h-12 bg-gray-50 hover:bg-gray-200 flex items-center justify-center absolute top-9 rounded-full right-4">
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Informed