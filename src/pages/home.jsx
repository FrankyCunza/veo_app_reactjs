import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Skeleton from '../components/skeleton';
import  { Redirect, useHistory } from 'react-router-dom'

const Home = () => {
    let history = useHistory()
    const [main, setMain] = useState([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/first-menu/menu',
            headers: {
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            params: {
                end_point: localStorage.getItem("end_point")
            }
        }).then(response => {
            setMain(response.data.data )
            setLoading(false)
        }, [])
    }, []);

    const logout = () => {
        localStorage.clear()
        history.push("/login")
    };

    return (
        <div className="bg-gray-200 h-full overflow-x-hidden w-full pb-14 min-h-screen">
            <div className="flex justify-center py-10">
                <img src="./assets/img/logo-veo365.png" alt="" />
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="grid grid-cols-3 gap-6">
                    {isLoading ? <Skeleton quantity={9} /> : 
                        main.map((item, i) => {
                            return(
                                <Link to={`${item.route}`}  key={'main'+i} className="bg-white hover:shadow-md flex flex-col justify-center items-center rounded-xl shadow cursor-pointer py-6">
                                    <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full">
                                        <img src={`./assets/svgs/${item.icon.split("../../assets/svgs/")[1]}`} alt="" className="w-12 max-h-12" />
                                    </div>
                                    <p className="mt-4 text-gray-700 text-xl font-semibold text-center leading-5 px-8">{item.title}</p>
                                    <i className="fas fa-long-arrow-alt-right text-3xl text-gray-400 mt-3"></i>
                                </Link>
                            )
                        })
                    }
                    <button onClick={() => logout()}  className="bg-white hover:shadow-2xl flex flex-col justify-center items-center rounded-xl shadow cursor-pointer pt-10 pb-8">
                        <img src={'./assets/svgs/logout-icon.svg'} alt="" className="w-14 max-h-16" />
                        <p className="mt-4 text-gray-700 text-lg font-semibold">Cerrar sesión</p>
                        <i className="fas fa-long-arrow-alt-right text-3xl text-gray-300 mt-3"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home