import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'

const Profile = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: 'profileFormReactive'
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
            setData(response.data.data)
            console.log(response.data.data)
        }, [])
    }, []);

    return (
        <div>
            <div className="max-w-xl mx-auto">
                {data.map((item, i) => {
                    if (item.type == "document") {
                        return (
                            item.loop.map((loop) => {
                                return(
                                    <div className="bg-gray-200 rounded px-6 py-3 flex w-max">{loop}</div>
                                )
                            })
                        )
                    } else if (item.form_type == "text") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="text" name="" id="" className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Profile