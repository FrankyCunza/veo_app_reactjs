import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const PageStep = () => {
    const location = useLocation();
    const [data, setData] = useState(location.state.data)
    const [steps, setSteps] = useState([])
    const [activeIndex, setActiveIndex] = useState(1)

    const nextSlide = (index) => {
        document.getElementById("slides").style.transform = `translateX(-${index}00%)`
    }

    useEffect(() => {
        let newArray = []
        for (let item of data.steps) {
            newArray.push({...item, status: null})
        }
        setSteps(newArray)
    }, [])

    const changeStep = (index, status) => {
        let newArray = [...steps]
        newArray[index]['status'] = status
        setSteps(newArray)
    }
    return (
        <div className="max-w-3xl mx-auto">
            <div>
                <Link to="/home" className="text-blue-500 text-left pt-4 flex">
                    <p>Atrás</p>
                </Link>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Steps</h1>
            </div>
            <div className="w-full overflow-hidden rounded-xl mt-10 shadow-lg relative">
                <div className="absolute top-6 right-8 font-medium z-10 text-2xl text-gray-700">
                    {activeIndex}
                    &nbsp;/&nbsp;
                    {steps.length}
                </div>
                {activeIndex>1 && 
                (<button className="bg-gray-300 w-14 h-14 rounded-full text-gray-700 absolute left-8 top-6 z-10" onClick={() => {nextSlide(activeIndex-2); setActiveIndex(activeIndex-1)}}>
                    <i className="fas fa-chevron-left"></i>
                </button>)}
                
                <div className="flex w-full transition duration-500 ease-in-out" id="slides">
                    {steps.map((el, index) => {
                        return (
                            <div className="bg-white px-12 py-24 flex-shrink-0 w-full flex flex-col items-center justify-center" key={'step'+index}>
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center"></div>
                                <h3 className="mt-4 text-2xl px-20 text-center">{el.instructions}</h3>
                                <div className={`mt-6`}>
                                    <button type="button" className={`bg-blue-600 text-white px-8 py-2 rounded-full ${el.status ? '' : 'opacity-20'}`} 
                                    onClick={() => { changeStep(index, true)}}>YES</button>
                                    <button type="button" className={`bg-blue-600 text-white px-8 py-2 rounded-full ml-4 ${el.status==false ? '' : 'opacity-20'}`} 
                                    onClick={() => {changeStep(index, false)}}>NO</button>
                                </div>
                                <div>
                                    {index == steps.length-1 ? <button className="bg-gray-300 px-12 py-3 rounded-full mt-4 text-gray-700">Send</button> : <>
                                    <button className={`bg-blue-700 px-12 py-3 rounded-full mt-4 text-white ml-3 ${steps[index].status !== null ? '' : 'opacity-20'}`} onClick={() => {nextSlide(index+1); setActiveIndex(activeIndex+1) }}>Next</button>
                                    </>}
                                    
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