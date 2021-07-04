import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Traffic = ({name}) => {
    const [traffic, setTraffic] = useState(name);
    const [data, setData] = useState([])
    console.log(name)
    useEffect(() => {
        if (traffic) {
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
                if (name == 'green') {
                    setData(response.data.data[0]['traffic_green'])
                } else if (name == 'yellow') {
                    setData(response.data.data['traffic_yellow'])
                } else {
                    setData(response.data.data[0]['traffic_red'])
                }
            }, [])
        }
    }, [name]);

    return (
        <div>{data ? <div>
            <div className="text-center py-6">
                <div className="text-center w-full">
                    <img src={`./assets/svgs/${data.icon}.svg`}  className="mx-auto w-28" alt="" />
                </div>
                <h2 className="text-6xl font-bold mt-3 text-gray-800">{data['title']}</h2>
            </div>
            <p className="mb-4 text-xl font-medium px-36 text-center">{data['description']}</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-8">Recomendaciones:</h2>
            <div className="flex flex-col">
                {data.recomendations ? data.recomendations.map((item, i) => {
                    return (
                        <div className="flex rounded flex-row bg-gray-100 pl-2 py-6 mt-6" key={i}>
                            <div className="w-32 flex min-w-max justify-center items-center">
                                <img src={`./assets/svgs/${item.icon}.svg`} alt="" className="w-14 max-h-14" />
                            </div>
                            <div className="w-full">
                                <p className="font-semibold leading-6 text-lg text-gray-800">{item.name}</p>
                            </div>
                        </div>
                    )
                }) : ''}
            </div>
        </div> : ''}</div>
    )
}

export default Traffic