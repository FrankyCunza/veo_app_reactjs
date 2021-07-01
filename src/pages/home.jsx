import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const Home = () => {
    const [main, setMain] = useState([]);
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
        }, [])
    }, []);
    return (
        <div className="text-red-500">
            {main.map((item, i) => {
                return(
                    <div>
                        <Link to={`${item.routerLink}`}>{item.title}</Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Home