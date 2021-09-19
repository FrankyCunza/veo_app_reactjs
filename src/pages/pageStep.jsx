import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HHMMSS, dateYYYYMMDD } from './../utils/utils'
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

    const handleSubmit = async () => {
        try {
            let object = {}
            Object.entries(localStorage).map(item => {
                if (item[0] == 'area_id' 
                    || item[0] == 'branch_id' 
                    || item[0] == 'company_id' 
                    || item[0] == 'document' 
                    || item[0] == 'end_point' 
                    || item[0] == 'full_name' 
                    || item[0] == 'job_id' 
                    || item[0] == 'worker_id' 
                ) {
                    object[`${item[0]}`] = item[1]
                }
            })
    
            // Traffic
            const total = steps.reduce((t, {value, status}) => {
                if (status) {
                  return t + parseFloat(value)
              } else {
                  return t
              }
            }, 0)
            let traffic = ''
            let green = steps.length / 3
            let yellow = green * 2
            if (total < green) {
                traffic = 'green'
            } else if (total < yellow) {
                traffic = 'yellow'
            } else {
                traffic = 'red'
            }
            
            let answers = []
            steps.map(el => answers.push({code: el.id, response: el.status ? el.status : false}))
            // Collect Data
            let dataSend = {
                ...object,
                "form": {
                    "code": data.id,
                    "traffic": traffic,
                    "is_protocol": true,
                    "version": 4.00,
                    "answers": answers
                },
                "date": dateYYYYMMDD(),
                "hour": HHMMSS(),
            }
            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')
            fetch('https://gateway.vim365.com/saveform/saveform', {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json',
                    'security-header': 'Vim365Aputek/2020.04',
                    Authorization: token,
                    id: id
                }
                })
                .then((response) => response.json())
                .then((json) => {
                })
                .catch((error) => {
                    alert('Error Save Form1', error)
            });
        } catch(e) {
            alert('Error Save Form', e)
        }
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
                                    {index == steps.length-1 ? <button className="bg-gray-300 px-12 py-3 rounded-full mt-4 text-gray-700" onClick={handleSubmit}>Send</button> : <>
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