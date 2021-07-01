import React, { useState, useEffect, setState } from 'react';
import axios from 'axios'

const Profile = () => {

    const [departaments, setDepartaments] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [selectProvinces, setSelectProvinces] = useState([]);
    const [selectDistricts, setSelectDistricts] = useState([]);

    useEffect(() => {
        const param = {
            company_id: localStorage.getItem('company_id'),
            end_point: localStorage.getItem('end_point'),
            page: 'ubigeo'
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
            setDepartaments(response.data.data.departaments)
            setDistricts(response.data.data.districts)
            setProvinces(response.data.data.provinces)
        }, [])
    }, []);

    const changeDepartament = (departament) =>{
        const newSelectProvincies = provinces.filter(item => item.departament === departament)
        setSelectProvinces(newSelectProvincies)
    }

    const changeProvincies = (provincies) =>{
        const newSelectDistricts = districts.filter(item => item.state === provincies)
        setSelectDistricts(newSelectDistricts)
    }

    return(
        <div>
            <h1>hola perfil</h1>

            <select name="departaments" id="departaments" onChange={ (e) => {changeDepartament(e.target.value)}}>
                <option value="">
                    Seleccionar
                </option>
                {departaments.map(item => <option value={item.value}>
                    {item.value}
                    </option>

                )}
            </select>

            <select name="provinces" id="provinces" onChange={ (e) => {changeProvincies(e.target.value)}}>
                <option value="">
                    Seleccionar
                </option>
                {selectProvinces.map(item => <option value={item.value}>
                    {item.value}
                    </option>
                )}
            </select>

            <select name="districts" id="districts">
                <option value="">
                    Seleccionar
                </option>
                {selectDistricts.map(item => <option value={item.value}>
                    {item.value}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Profile