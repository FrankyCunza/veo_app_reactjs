import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'

const Profile = () => {
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [risksChecks, setrisksChecks] = useState([]);
    const [ubigee, setUbigee] = useState([]);
    const [selectUbigee, setSelectUbigee] = useState([]);

    useEffect(() => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: 'profileFormReactive'
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
            setData(response.data.data)
            getProfile()
            console.log(response.data.data)
        }, [])

        getUbigee()
    }, []);

    const getUbigee = () => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: "ubigeo"
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
            setUbigee(response.data.data)
        }, [])
    }

    const getProfile = () => {
        axios({
            method: 'get',
            url: 'https://gateway.vim365.com/users/getprofile',
            headers: {
                'security-header': 'Vim365Aputek/2020.04',
                Authorization: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
        }).then(response => {
            let checked = []
            for (const [key, value] of Object.entries(response.data.data.risks.risk_factors.condition)) {
                if (value == true) {
                    checked.push(key)
                }
            }
            setrisksChecks(checked)
            setProfile(response.data.data.data)
        }, [])
    }

    const risks = (item) => {
        if (risksChecks.includes(item.toString())) {
            return true
        }
    }

    const changeUbigee = (e, name)  => {
        console.log(name)
        if (name == "departaments") {
            const provinces = ubigee.provinces.filter(item => 
                item.departament === e.target.value
            )
            setSelectUbigee({
                ["departaments"]: ubigee['departaments'],
                ["provinces"]: provinces,
                ["districts"]: ubigee['districts']
            })
        } else if (name =="provinces") {
            const districts = ubigee.districts.filter(item => 
                item.state === e.target.value
            )
            console.log(districts)
            console.log(ubigee)
            setSelectUbigee({
                ["departaments"]: ubigee['departaments'],
                ["provinces"]: ubigee['provinces'],
                ["districts"]: districts
            })
        } else {

        }
    }

    return (
        <div>
            <div className="max-w-xl mx-auto">
                <div className="grid grid-cols-3 mt-4 gap-4">
                    <select name="" id="" className="bg-gray-200 py-3 px-4 rounded" onChange={(e) => {changeUbigee(e, 'departaments')}}>
                        {ubigee.departaments ? ubigee.departaments.map((item, i) => {
                            return (
                                <option value={item.value} key={item.id}>{item.value}</option>
                                )
                            }) : ''}
                    </select>
                    <select name="" id="" className="bg-gray-200 py-3 px-4 rounded" onChange={(e) => {changeUbigee(e, 'provinces')}}>
                        {selectUbigee.provinces ? selectUbigee.provinces.map((item, i) => {
                            return (
                                <option value={item.value} key={item.id}>{item.value}</option>
                                )
                            }) : ''}
                    </select>
                    <select name="" id="" className="bg-gray-200 py-3 px-4 rounded">
                        {selectUbigee.districts ? selectUbigee.districts.map((item, i) => {
                            return (
                                <option value={item.value} key={item.id}>{item.value}</option>
                                )
                            }) : ''}
                    </select>
                </div>
                {data.map((item, i) => {
                    if (item.type == "document") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <div className="flex" key={i}>
                                    {item.loop.map((loop, d) => {
                                        return(
                                            <div className={`bg-gray-200 rounded px-6 py-3 flex w-max ${d == 0 ? '' : 'ml-2'}`} key={d}>{loop}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    } else if (item.form_type == "full_name" || item.form_type == "paternal_surname" || item.form_type == "maternal_surname") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="text" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "birth_day") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="date" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "cell_phone") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="number" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "gender") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <div className="flex">
                                {item.loop.map((loop, i) => {
                                    return (
                                        <div key={i} className={`flex bg-gray-200 w-max justify-center items-center rounded px-4 py-2 ${i == 0 ? '' : 'ml-2'}`}>
                                            <label className="mr-2">{loop}</label>
                                            <input type="radio" name={item.name} id="" defaultValue={profile[item.form_type]} className="rounded border border-blue-400 border-solid" />
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        )
                    } else if (item.form_type == "email") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="email" name="" id="" className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "address") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="address" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.type == "title") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                            </div>
                        )
                    } else if (item.form_type == "work_job") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="address" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "work_address") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="address" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "work_area") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="address" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.form_type == "work_name") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <label htmlFor="" className="block mb-1">{item.title}</label>
                                <input type="address" name="" id="" defaultValue={profile[item.form_type]} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                            </div>
                        )
                    } else if (item.type == "pesoTalla") {
                        return (
                            <div key={i}>
                                <div className="mt-2 text-left w-full">
                                    <label htmlFor="" className="block mb-1">Peso:</label>
                                    <input type="address" name="" id="" defaultValue={profile['weight']} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                                </div>
                                <div className="mt-2 text-left w-full">
                                    <label htmlFor="" className="block mb-1">Talla:</label>
                                    <input type="address" name="" id="" defaultValue={profile['size']} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                                </div>
                                <div className="mt-2 text-left w-full">
                                    <label htmlFor="" className="block mb-1">IMC:</label>
                                    <input type="address" name="" id="" defaultValue={profile['IMC']} className="h-10 rounded border border-blue-400 border-solid w-full pl-2" />
                                </div>
                            </div>
                        )
                    } else if (item.type == "conditional") {
                        return (
                            <div key={i} className="mt-2 text-left w-full">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <div className="flex mt-2">
                                    {item.loop.map((loop, i) => {
                                        return (
                                            <div key={i} className={`flex bg-gray-200 w-max justify-center items-center rounded px-4 py-2 ${i == 0 ? '' : 'ml-2'}`}>
                                                <label className="mr-2">{loop}</label>
                                                <input type="radio" name={item.name} id="" defaultValue={profile[item.type]} className="rounded border border-blue-400 border-solid" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    } else if (item.type == "emergency_contact") {
                        return (
                            <div key={i} className="mt-2 text-left w-full">
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                <div className="">
                                    {item.data.map((loop, s) => {
                                        if (loop.type == "name_contact") {
                                            return (
                                                <div className="w-full block">
                                                    <label className="mb-1 block w-full">{loop.title}</label>
                                                    <input type="text" name={loop.name} id="" className="h-10 rounded border border-blue-400 border-solid w-full" />
                                                </div>
                                            )
                                        } else if (loop.type == "telephone_contact") {
                                            return (
                                                <div className="w-full block mt-2">
                                                    <label className="mb-1 block w-full">{loop.title}</label>
                                                    <input type="text" name={loop.name} id="" className="h-10 rounded border border-blue-400 border-solid w-full" />
                                                </div>
                                            )
                                        } else if (loop.type == "cellphone_contact") {
                                            return (
                                                <div className="w-full block mt-2">
                                                    <label className="mb-1 block w-full">{loop.title}</label>
                                                    <input type="text" name={loop.name} id="" className="h-10 rounded border border-blue-400 border-solid w-full" />
                                                </div>
                                            )
                                        } else if (loop.type == "email") {
                                            return (
                                                <div className="w-full block mt-2">
                                                    <label className="mb-1 block w-full">{loop.title}</label>
                                                    <input type="text" name={loop.name} id="" className="h-10 rounded border border-blue-400 border-solid w-full" />
                                                </div>
                                            )
                                        } else if (loop.type == "select") {
                                            return (
                                                <div className="w-full block mt-2">
                                                    <label className="mb-1 block w-full">{loop.title}</label>
                                                    <select name="" id="" className="w-full h-10 rounded border border-solid border-blue-400">
                                                        <option value="">Seleccionar</option>
                                                        {loop.loop.map((select, l) => {
                                                            return (
                                                                <option value="" key={l}>{select}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            )
                                        } else {

                                        }
                                    })}
                                </div>
                            </div>
                        )
                    } else if (item.type == "checkboxes") {
                        return (
                            <div className="mt-2 text-left w-full" key={i}>
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                                {item.loop.map((loop, d) => {
                                    return (
                                        <div key={d}>
                                            <label htmlFor="">{loop.name}</label>
                                            <input type="checkbox" checked={risks(loop.id)} />
                                        </div>
                                    )
                                })}                                
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Profile