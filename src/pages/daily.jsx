import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'

const Daily = () => {
    const [data, setData] = useState([]);
    useEffect(async () => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: 'DeclarationReactive'
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
        }).then(data => {
            console.log(data)
        })
    });

    return (
        <div>
            <div>
                <label>Uno</label>
                <input type="checkbox" data-id="8" />
            </div>
            <div>
                <label>Dos</label>
                <input type="checkbox" />
            </div>
            <div>
                <label>Tres</label>
                <input type="checkbox" />
            </div>
            <div>
                <label>Cuatro</label>
                <input type="checkbox" />
            </div>
            <div>
                <label>Cinco</label>
                <input type="checkbox" />
            </div>
        </div>
    )
}

export default Daily