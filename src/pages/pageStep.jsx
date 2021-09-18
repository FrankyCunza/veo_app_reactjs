import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const PageStep = () => {
    const location = useLocation();
    const [data, setData] = useState(location.state.data)
    const [steps, setSteps] = useState(location.state.data.steps)
    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Steps</h1>
            </div>
            <div className="w-full overflow-x-hidden mt-10">
                <div className="flex w-full">
                    {steps.map((el, index) => {
                        return (
                            <div className="bg-white rounded shadow-sm p-12 flex-shrink-0 w-full flex flex-col items-center justify-center" key={'step'+index}>
                                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center"></div>
                                <h3 className="mt-4">{el.instructions}</h3>
                                <div className="mt-6">
                                    <button type="button" className="bg-blue-600 text-white px-8 py-2 rounded-full">YES</button>
                                    <button type="button" className="bg-blue-600 text-white px-8 py-2 rounded-full ml-4">NO</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {console.log(location.state.data)}
        </div>
    );
};

export default PageStep;