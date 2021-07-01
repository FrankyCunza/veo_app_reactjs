import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';


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

    const updateData = (data) =>{
        const NewArray = boxes.map(item => {
            if (item.code == data.getAttribute("data-id")){
                item.selected = data.checked
            }
            return item
        })
        setBoxes(NewArray)
    }

    const sendData = () => {
        console.log(boxes)
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
                        <div key={post.code} className={`py-6 relative border-2 cursor-pointer rounded-md border-solid border-gray-200 flex items-center justify-center flex-col ${post.selected ? 'bg-blue-600 text-white' : ''}`}>
                            <img src={`./assets/svgs/${post.image}.svg`} alt="" className="w-14 max-h-16" />
                            <p className="leading-5 mt-3 font-medium text-base">{post.title}</p>
                            <input type="checkbox" 
                                data-id = {post.code}
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
               <button type="button" className="rounded bg-blue-500 py-2 px-6 text-white" onClick={sendData}>Enviar</button>
            </div>
        </div>
    )
}

export default Daily