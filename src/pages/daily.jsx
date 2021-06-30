import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'

const Daily = () => {
    const [boxes, setBoxes] = useState([]);
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
        }, [])
    }, []);

    return (
        <div>
            {boxes.map(post => (
                <li key={post.code}>{post.title}</li>
            ))}
        </div>
    )
}

export default Daily