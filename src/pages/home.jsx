import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Skeleton from '../components/skeleton';

const Home = () => {
    const [main, setMain] = useState([]);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://gateway.vim365.com/first-menu/menu',
            headers: {
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
        }).then(response => {
            console.log(response.data.data)
            setMain(response.data.data )
            setLoading(false)
        }, [])
    }, []);
    return (
        <div className="bg-blue-500 h-full overflow-x-hidden w-full pb-14 min-h-screen">
            <div className="flex justify-center py-10">
                <img src="./assets/img/logo-veo365.png" alt="" />
            </div>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-3 gap-6">
                    {isLoading ? <Skeleton quantity={9} /> : 
                        main.map((item, i) => {
                            return(
                                <Link to={`${item.route}`}  key={i} className="bg-white hover:shadow-2xl flex flex-col justify-center items-center rounded-xl shadow cursor-pointer pt-16 pb-8">
                                    <img src={`./assets/svgs/${item.icon.split("../../assets/svgs/")[1]}`} alt="" className="w-14 max-h-16" />
                                    <p className="mt-4 text-gray-700 text-lg font-semibold">{item.title}</p>
                                    <i className="fas fa-long-arrow-alt-right text-3xl text-gray-300 mt-3"></i>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home