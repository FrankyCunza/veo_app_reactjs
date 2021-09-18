import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'

const Protocols = () => {
    let history = useHistory()
    const [data, setData] = useState([]);

    const gotoStep = (item) => {
        history.push("/pageStep", {data: item})
    };

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://gateway.vim365.com/cardslides/slides',
            headers: {
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
        }).then(response => {
            setData(response.data.data)
            
        }, [])
    }, []);

    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Protocolos</h1>
            </div>

            {data.map((ele,i)=>{
                return (
                    <div className="w-full bg-white rounded-xl p-6 shadow hover:shadow-xl mt-4 flex cursor-pointer" key={i} onClick={() => gotoStep(ele)}>
                        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                        <h2 className="pt-4 pl-4 text-xl">{ele.name}</h2>
                    </div>
                );
            })}

        </div>
    )
}

export default Protocols