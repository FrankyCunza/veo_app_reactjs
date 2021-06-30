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
            console.log(boxes)
        }, [])
    }, []);

    return (
        <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mt-8">
            {boxes.map(post => (
                (post.type == "check" ? (
                    <div key={post.code} className="py-6 border-2 rounded border-solid border-gray-300 flex items-center justify-center flex-col">
                        <img src={`./assets/svgs/${post.image}.svg`} alt="" className="w-14 max-h-16" />
                        <p className="leading-5 mt-3">{post.title}</p>
                    </div>
                ) : (''))
            ))}
        </div>
    )
}

export default Daily