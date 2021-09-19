import React, { useReducer, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../components/skeleton';
import  { Redirect, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const InformedArticle = () => {
    let history = useHistory()
    const location = useLocation();
    const [data, setData] = useState(location.state.data)

    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <a onClick={() => history.goBack()} className="text-blue-500 text-left pt-4 flex cursor-pointer">
                    <p>Atrás</p>
                </a>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">{data.name}</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </div>
    )
}

export default InformedArticle