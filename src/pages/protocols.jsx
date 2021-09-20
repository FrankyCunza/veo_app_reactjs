import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import Skeleton from '../components/skeleton';

const Protocols = () => {
    let history = useHistory()
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true)

    const gotoStep = (item) => {
        history.push("/pageStep", {data: item})
    };

    useEffect(() => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: "protocols"
        };
        axios({
            method: 'get',
            url: 'https://gateway.vim365.com/cardslides/slides',
            headers: {
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            params: param
        }).then(response => {
            setData(response.data.data)
            setLoading(false)
        }, [])
    }, []);

    return (
        <div className="max-w-3xl mx-auto bg-white px-12 rounded-xl shadow-xl my-6 py-6">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Protocolos</h1>
            </div>
            {isLoading ? <Skeleton quantity={4} /> : 
                data.map((ele,i)=>{
                    return (
                        <div className="w-full bg-white border border-solid border-gray-300 rounded-xl p-6 shadow hover:shadow-xl mt-4 flex cursor-pointer relative" key={i} onClick={() => gotoStep(ele)}>
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <img src={`./assets/svgs/${ele.icon.split("protocols/")[1]}`} alt="" className="w-15 max-h-16" />
                            </div>
                            <h2 className="pt-4 pl-4 text-xl">{ele.name}</h2>
                            <div className="w-12 h-12 bg-gray-50 hover:bg-gray-200 flex items-center justify-center absolute top-9 rounded-full right-4">
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    );
                })
            }
            

        </div>
    )
}

export default Protocols