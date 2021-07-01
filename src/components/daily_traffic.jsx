import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Traffic = ({name}) => {
    const [traffic, setTraffic] = useState(name);

    useEffect(() => {
        if (traffic) {
            console.log("Hello")
            const param = {
                company_id: localStorage.getItem('company_id'),
                end_point: localStorage.getItem('end_point'),
                page: 'traffic-daily-test'
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
                console.log(response)
            }, [])
        }
    }, []);

    return (
        <div>{name}</div>
    )
}

export default Traffic