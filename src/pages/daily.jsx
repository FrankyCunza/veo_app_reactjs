import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { HHMMSS, dateYYYYMMDD } from './../utils/utils'


const Daily = () => {
    const [boxes, setBoxes] = useState([]);
    const [range, setRange] = useState([]);
    const [value, setValue] = useState(0);
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
            setRange(response.data.range)
            // for (const item of response.data.data) {
            //     setGetData((s) => [...s, {"code": item.code, "response": item.selected}])
            // }
        }, [])
    }, []);

    const updateData = (data) =>{
        if (data.checked == true) {
            setValue(value+parseInt(data.value))
        } else {
            setValue(value-parseInt(data.value))
        }
        const NewArray = boxes.map(item => {
            if (item.code == data.getAttribute("data-id")){
                item.selected = data.checked
            }
            return item
        })
        setBoxes(NewArray)
    }

    const send = () => {
        let traffic = ''
        if (value === range['min_low_range'] || value <= range['max_low_range']) {
            traffic = 'green'
        } else if (value === range['min_med_range'] || value <= range['max_med_range']) {
            traffic = 'yellow'
        } else if (value === range['min_hig_range'] || value <= range['max_hig_range']) {
            traffic = 'red'
        } else {}

        let local = {}
        for (const [key, value] of Object.entries(localStorage)) {
            local[key] = value
        }

        let data = {
            ...local,
            "code": "DT2005",
            "form": {
                "answers": []
            },
            "status": true,
            "traffic": traffic,
            "date": dateYYYYMMDD(),
            "hour": HHMMSS(),
            "version": 4.00
        }
        for (const item of boxes) {
            data['form']['answers'].push({code: item.code, response: item.selected})
        }
        // setSendData({...local, ...data})
        console.log(data)
    }
    
    return (
        <div className="max-w-3xl mx-auto"> 
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Declaración diaria</h1>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-8">
                {boxes.map(post => (
                    (post.type == "check" ? (
                        <div key={post.code} className={`py-6 relative border-2 cursor-pointer rounded-md border-solid border-gray-200 flex items-center justify-center flex-col ${post.selected ? 'bg-blue-600 text-white' : ' text-gray-700'}`}>
                            <img src={`./assets/svgs/${post.image}.svg`} alt="" className="w-15 max-h-16" />
                            <p className="leading-5 px-2 mt-3 font-medium text-lg text-center">{post.title}</p>
                            <input type="checkbox" 
                                data-id = {post.code}
                                value = {post.value}
                                className="absolute opacity-0 w-full h-full cursor-pointer"
                                checked = {post.selected}
                                onChange = {
                                    (e) => {updateData(e.target)}
                                }
                        />
                        </div>
                    ) : (''))
                ))}
            </div>
            <div className="w-full flex justify-center mt-4">
               <button type="button" className="rounded bg-blue-500 py-2 px-6 text-white" onClick={send}>Enviar</button>
            </div>
        </div>
    )
}

export default Daily