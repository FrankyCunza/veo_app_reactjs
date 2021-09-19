import React, { useReducer, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../components/skeleton';
import  { Redirect, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const InformedArticle = () => {
    let history = useHistory()
    const location = useLocation();
    const [data, setData] = useState(location.state.data)
    console.log(location.state)

    const gotoNotice = (item) => {
        history.push("/informedArticles", {data: item})
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/getinformed" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">{data.name}</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6">
                {data.articles.length>0 && data.articles.map((el, i) => {
                    return (
                        <div className="w-full bg-white rounded-xl p-6 shadow hover:shadow-xl mt-4 flex cursor-pointer relative" key={'notice'+i} onClick={() => gotoNotice(el)}>
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                                <img src={`./assets/svgs/td3.svg`} alt="" className="w-15 max-h-16" />
                            </div>
                            <h2 className="pt-4 pl-4 text-xl">{el.name}</h2>
                            <div className="w-12 h-12 bg-gray-50 hover:bg-gray-200 flex items-center justify-center absolute top-9 rounded-full right-4">
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default InformedArticle