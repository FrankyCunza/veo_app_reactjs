import React, { useState, useEffect, setState } from 'react';
import { useForm, useWatch } from "react-hook-form";
import  { Redirect, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import Skeleton from '../components/skeleton';
import { Alert } from '../components/alert';

const Profile = () => {
    const { register, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm();
    const [form, setForm] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState({title: '', message: '', route: '', state: ''})
    let history = useHistory()
    let fieldTypes = {}

    const data = {
        "company_id":1,
        "end_point":"test",
        "job_id":null,
        "page":"profileForm",
        "cards":[
          {
            "type":"field_select",
            "title":"Tipo de documento:",
            "data": [
                {
                    "label": "DNI",
                    "value": "DNI"
                },
                {
                    "label": "Carnet de extranjería",
                    "value": "Carnet de extranjería"
                },
                {
                    "label": "Pasaporte",
                    "value": "Pasaporte"
                }
            ],
            "name":"type_document"
          },
          {
            "type":"field_text",
            "title":"Documento:",
            "name":"document"
          },
          {
            "type":"field_text",
            "title":"Nacionalidad:",
            "name":"nationality"
          },
          {
            "type":"field_text",
            "title":"Nombres:",
            "name":"full_name"
          },
          {
            "type":"field_text",
            "title":"Apellidos:",
            "name":"last_name"
          },
          {
            "type":"field_text",
            "title":"Apellido Paterno:",
            "name":"last_name_father"
          },
          {
            "type":"maternal_surname",
            "title":"Apellido Materno:",
            "name":"last_name_mother"
          },
          {
            "type":"birth_day",
            "title":"Fecha de nacimiento:",
            "name":"birth_day"
          },
          {
            "type":"field_select",
            "title":"Género:",
            "name":"gender",
            "data": [
                {
                    "label": "Hombre",
                    "value": "Hombre"
                },
                {
                    "label": "Mujer",
                    "value": "Mujer"
                }
            ]
          },
          {
            "type":"field_number",
            "title":"Número de celular:",
            "name":"cell_phone"
          },
          {
            "type":"field_email",
            "title":"Correo electrónico:",
            "name":"email"
          },
          {
            "type":"field_address",
            "title":"Dirección:",
            "name":"address"
          },
          {
            "type":"field_address",
            "title":"Dirección Prueba:",
            "name":"address_two"
          },
          {
            "type":"title",
            "title":"Trabajo"
          },
          {
            "type":"field_text",
            "title":"Nombre de la empresa:",
            "name":"work_job"
          },
          {
            "type":"field_text",
            "title":"Área de trabajo:",
            "name":"work_area"
          },
          {
            "type":"field_text",
            "title":"Puesto de trabajo:",
            "name":"work_name"
          },
          {
            "type":"field_text",
            "title":"Dirección del trabajo:",
            "name":"work_address"
          },
          {
            "type":"field_radio_options",
            "title":"Riesgo de exposición:",
            "name":"riskexposure",
            "data":[
              "Muy alto",
              "Alto",
              "Mediano",
              "Bajo"
            ]
          },
          {
            "type":"title",
            "title":"Datos Clínicos"
          },
          {
            "type":"field_number",
            "title":"Peso",
            "name":"weight"
          },
          {
            "type":"field_number",
            "title":"Talla:",
            "name":"size"
          },
          {
            "type":"field_checkboxes",
            "title":"Factores de riesgo",
            "name":"risk_factors",
            "data":[
              {
                "title":"Mayor de 65 años",
                "id":402,
                "icon":"fdr1"
              },
              {
                "title":"Hipertensión Arterial no controlada",
                "id":403,
                "icon":"fdr2"
              },
              {
                "title":"Diabetes Mellitus",
                "id":412,
                "icon":"fdr3"
              },
              {
                "title":"Enfermedad cardiovascular grave",
                "id":405,
                "icon":"fdr4"
              },
              {
                "title":"Enfermedad pulmonar crónica",
                "id":406,
                "icon":"fdr5"
              },
              {
                "title":"Gestante",
                "id":407,
                "icon":"gestante"
              },
              {
                "title":"Cáncer",
                "id":408,
                "icon":"fdr6"
              },
              {
                "title":"Asma moderada/severa",
                "id":413,
                "icon":"fdr7"
              },
              {
                "title":"Obesidad con IMC de 40 a más",
                "id":409,
                "icon":"fdr8"
              },
              {
                "title":"Insuficiencia renal crónica en tratamiento con hemodiálisis",
                "id":410,
                "icon":"fdr9"
              },
              {
                "title":"Enfermedad o tratamiento inmunosupresor",
                "id":411,
                "icon":"fdr10"
              },
              {
                "title":"Lactantes",
                "id":414,
                "icon":"fdr8"
              },
              {
                "title":"PCD con licencia",
                "id":417,
                "icon":"fdr10"
              },
              {
                "title":"TESTROUTE",
                "id":418,
                "icon":"fdr1"
              },
              {
                "title":"Ninguno",
                "id":102,
                "icon":"fd11"
              }
            ]
          },
          {
            "type":"field_radio_conditional",
            "title":"Paciente Diagnosticado COVID19",
            "name":"pacientediagnosticado"
          },
          {
            "type":"field_radio_conditional",
            "title":"Paciente de COVID-19 dado de alta",
            "name":"pacientecovid"
          },
          {
            "type":"field_radio_conditional",
            "title":"Test Rápido",
            "name":"pacientecovid2"
          },
          {
            "type":"title",
            "title":"Antecedentes Familiares"
          }
        ],
        "range":{
          "min_low_range":0,
          "max_low_range":5,
          "min_med_range":6,
          "max_med_range":10,
          "min_hig_range":11,
          "max_hig_range":20
        }
    }

    const getProfileForm = () => {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('id')
      const company_id = localStorage.getItem('company_id')
      const end_point = localStorage.getItem('end_point')

      const param = {
        company_id: localStorage.getItem('company_id'),
        end_point: localStorage.getItem('end_point'),
        page: 'profileForm'
      };

      axios({
        method: 'get',
        url: `http://localhost:8000/checkcards/cards`,
        headers: {
            'security-header': 'Vim365Aputek/2020.04',
            Authorization: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        },
        params: param
      }).then(response => {
        console.log(response.data)
        if (!response.data.error) {
          setForm(response.data)
          setLoading(false)
          for (let i=0; i<response.data.data.length; i++) {
            fieldTypes[response.data.data[i].name] = response.data.data[i].type
            if (response.data.data[i].type === 'field_text' || 
              response.data.data[i].type === 'field_date' || 
              response.data.data[i].type === 'field_select' || 
              response.data.data[i].type === 'field_radio_conditional' || response.data.data[i].type === 'field_radio_options') {
              setValue(response.data.data[i].name, '')
            } else if (response.data.data[i].type === 'field_checkboxes') {
              let newArray = {}
              for (let s=0; s<response.data.data[i].data.length; s++) {
                newArray[response.data.data[i].data[s].title] = false
              }
              setValue(response.data.data[i].name, newArray)
            }
          }
          getProfile()
        } else {
          setMessageAlert({title: response.data.title ?? response.data.message, message: response.data.message, route: '/home', state: 'error'})
          setShowAlert(true)
        }
      }, []).catch((error) => {
        setLoading(false)
        setMessageAlert({title: 'Try again later', message: 'Try again later', route: '/home', state: 'error'})
        setShowAlert(true)
      })
    }

    const getProfile = () => {
      axios({
        method: 'get',
        url: 'http://localhost:8000/users/getprofile',
        headers: {
          'security-header': 'Vim365Aputek/2020.04',
          Authorization: localStorage.getItem('token'),
          id: localStorage.getItem('id')
        },
      }).then(response => {
          let getValues = response.data.data
          console.log(getValues)
          for (const [key, value] of Object.entries(getValues)) {
            if (fieldTypes[key] === 'field_text' || fieldTypes[key] === 'field_date' || fieldTypes[key] === 'field_number' || fieldTypes[key] === 'field_select' || fieldTypes[key] === 'field_radio_conditional' || fieldTypes[key] === 'field_radio_options') {
              setValue(key, value)
            } else if (fieldTypes[key] === 'field_checkboxes') {
              let newDict = {}
              for (const [subKey, subValue] of Object.entries(getValues[key])) {
                newDict[subKey] = subValue
              }
              setValue(key, newDict)
            } else {}
          }
          setLoading(false)
      }, [])
    }

    useEffect(() => {
      getProfileForm()
    }, [])

    const onSubmit = async (data) => {
      console.log(data)
      // return false
      setLoading(true)
      let dataSend = {
        "title":"Perfil",
        "code": "SD2005",
        "version": '2.97',
        "health_staff": false,
        "data": {...data},
        "contact_emergency": {}
      }; 
      try {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        fetch('http://localhost:8000/users/saveprofile', {
          method: 'POST',
          body: JSON.stringify({data: dataSend}),
          headers: {
              'Content-Type': 'application/json',
              'security-header': 'Vim365Aputek/2020.04',
              Authorization: token,
              id: id
          }
          })
          .then((response) => response.json())
          .then((json) => {
            setLoading(false)
            if (!json.error) {
              setMessageAlert({title: json.title ?? json.message, message: json.message, route: '/home', state: 'success'})
            } else {
              setMessageAlert({title: json.title ?? json.message, message: json.message, route: '/home', state: 'error'})
            }
            setShowAlert(true)
          })
          .catch((error) => {
            // alert('Error Save Form1', error)
            setLoading(false)
            setMessageAlert({title: 'Try again later', message: 'Try again later', route: '/home', state: 'error'})
            setShowAlert(true)
          });
      } catch(e) {
        setLoading(false)
        setMessageAlert({title: 'Try again later', message: 'Try again later', route: '/home', state: 'error'})
        setShowAlert(true)
      }
    };

    const animateSlide = (id, index) => {
        document.getElementById(`${id}`).style.transform = `translateX(-${index}00%)`
    }

    return (
        <div className="max-w-3xl mx-auto bg-white px-12 rounded-xl shadow-xl my-6 py-6">
            <div>
                <a onClick={() => history.goBack()} className="text-blue-500 text-left pt-4 flex cursor-pointer">
                    <p>Atrás</p>
                </a>
                <h1 className="text-3xl font-bold text-left pt-4 text-gray-800">Perfil</h1>
            </div>
            {showAlert && <Alert props={messageAlert} />}
            <form className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
            {
              isLoading ? <Skeleton quantity={4} /> : form.data.length>0 && form.data.map((el, i) => {
                  if (el.type === "field_text") {
                    return (
                      <div className="w-full" key={'profile'+el.name}>
                          <p className="font-medium text-lg">{el.title}</p>
                          <input type="text" name="" id="" {...register(el.name)} setValue={setValue}
                          className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50' />
                      </div>
                    )
                  } else if (el.type === "field_date") {
                    return (
                      <div className="w-full" key={'profile'+el.name}>
                        <p className="font-medium text-lg">{el.title}</p>
                        <input type="date" name="" id="" {...register(el.name)}
                        className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50' />
                      </div>
                    )
                  } else if (el.type === "field_number") {
                    return (
                      <div className="w-full" key={'profile'+el.name}>
                        <p className="font-medium text-lg">{el.title}</p>
                        <input type="number" name="" id="" {...register(el.name)}
                        className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50' />
                      </div>
                    )
                  } else if (el.type === "field_select") {
                      return (
                        <div className="w-full" key={'profile'+el.name}>
                          <p className="font-medium text-lg">{el.title}</p>
                          <select name="" id="" {...register(el.name)}
                          className='w-full px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus-blue-600 border border-solid border-gray-400 mt-2 bg-gray-50'>
                              <option value="">Seleccionar</option>
                              {el.data.map((item, index) => {
                                  return (
                                      <option value={item.label} >{item.label}</option>
                                  )
                              })}
                          </select>
                        </div>
                      )
                  } else if (el.type === "field_radio_conditional") {
                      return (
                        <div className="w-full" key={'profile'+el.name}>
                          <p className="font-medium text-lg">{el.title}</p>
                          <div className="mt-2 flex">
                            <div className={`rounded-xl pl-4 pr-10 cursor-pointer py-2.5 font-medium text-gray-800 border border-solid ${watch(`${el.name}`) == false ? 'border-blue-600' : 'border-gray-400'} flex items-center w-max`}
                            onClick={() => {setValue(el.name, false)}}>
                              <div className={`w-5 h-5 bg-gray-300 shadow-sm rounded-full mr-4 flex items-center justify-center`}>
                                <div className={`w-3 h-3 rounded-full ${watch(`${el.name}`) == false ? 'bg-blue-600' : 'bg-white'}`}></div>
                              </div>
                               No
                            </div>

                            <div className={`ml-3 rounded-xl pl-4 pr-10 cursor-pointer py-2.5 font-medium text-gray-800 border border-solid ${watch(`${el.name}`) == true ? 'border-blue-600' : 'border-gray-400'} flex items-center w-max`}
                            onClick={() => {setValue(el.name, true)}}>
                              <div className={`w-5 h-5 bg-gray-300 shadow-sm rounded-full  mr-4 flex items-center justify-center`}>
                                <div className={`w-3 h-3 ${watch(`${el.name}`) == true ? 'bg-blue-600' : 'bg-white'} rounded-full`}></div>
                              </div> 
                                Si
                              </div>
                          </div>
                        </div>
                      )
                  } else if (el.type === "field_radio_options") {
                      return (
                          <div className="w-full" key={'profile'+el.name}>
                              <p className="font-medium text-lg">{el.title}</p>
                              <div className="mt-2 flex -ml-2">
                                  {el.data.map((item, index) => {
                                      return (
                                        <div className="px-2">
                                          <div className={`rounded-xl pl-4 pr-6 cursor-pointer py-2.5 font-medium text-gray-800 border border-solid ${watch(`${el.name}`) == item ? 'border-blue-600' : 'border-gray-400'}  flex items-center w-max`}
                                          onClick={() => {setValue(el.name, item)}}><div className="w-5 h-5 shadow-sm rounded-full bg-gray-300 mr-4 flex items-center justify-center"><div className={`${watch(`${el.name}`) == item ? 'bg-blue-600' : 'bg-white'} w-3 h-3 rounded-full`}></div></div> {item}</div>
                                        </div>
                                      )
                                  })}
                              </div>
                          </div>
                      )
                  } else if (el.type === "field_checkboxes") {
                      return (
                        <div className="w-full" key={'profile'+el.name}>
                          <p className="font-medium text-lg">{el.title}</p>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            {el.data.map((item, index) => {
                              return (
                                <div className={`border border-solid text-center transition duration-200 ease-linear relative px-6 py-14 rounded-xl shadow ${watch(`${el.name}.${item.title}`)==true ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 border-gray-400'}`}>
                                  <input type="checkbox" checked={watch(`${el.name}`) ? watch(`${el.name}.${item.title}`) : false} 
                                  onChange={(e) => {setValue(`${el.name}.${item.title}`, e.target.checked)}} className="absolute cursor-pointer opacity-0 top-0 left-0 w-full h-full" />
                                  <p className="text-lg leading-5 tracking-wide font-medium">{item.title}</p>
                                  {watch(`${el.name}.${item.title}`)==true && <div className="w-7 h-7 text-xs bg-black bg-opacity-30 rounded-full flex items-center justify-center absolute right-3 top-3 text-white">
                                    <i className="fas fa-check"></i>
                                  </div>}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                  } else if (el.type === "carousel") {
                      return (
                          <div className="w-full" key={'profile'+el.name}>
                              <p className="font-medium text-lg">{el.title}</p>
                              <div className="bg-white shadow-xl overflow-hidden rounded-2xl border-2 border-solid border-blue-600 mt-2">
                                  <div className="flex transition duration-500 ease-in-out" id={el.title}>
                                      {el.data.map((item, index) => {
                                          return (
                                              <div className="w-full flex-shrink-0 px-12 py-16 relative flex items-center justify-center">
                                                  {index>0 && <div className="w-12 h-12 cursor-pointer rounded-full absolute top-5 left-5 bg-gray-200 flex items-center justify-center"
                                                  onClick={() => {animateSlide(el.title, index-1)}}>
                                                      <i className="fas fa-chevron-left"></i>
                                                  </div>}
                                                  <div className="flex items-center justify-center flex-col">
                                                      <div className="w-28 h-28 mb-6 rounded-full flex items-center justify-center bg-gray-100">
                                                          <img src={'./assets/svgs/logout-icon.svg'} alt="" className="w-14 max-h-16" />
                                                      </div>
                                                      <h2 className="text-2xl font-medium">{item.title}</h2>
                                                      <p className="text-lg mt-4">{item.description}</p>
                                                      <div className="mt-6 flex justify-center">
                                                          <button type="button" className={`tracking-wide font-medium border border-solid rounded-full py-3 pl-5 pr-12 border-blue-600 ${watch(`${el.name}.${item.title}`)==false ? 'bg-blue-600 text-white' : 'border-white'}`}
                                                          onClick={() => {setValue(`${el.name}.${item.title}`, false)}}><i className={`fas fa-check opacity-0 mr-4 ${watch(`${el.name}.${item.title}`)==false && 'opacity-100'}`}></i>NO</button>
                                                          <button type="button" className={`tracking-wide font-medium border border-solid rounded-full py-3 pl-5 pr-12 border-blue-600 ml-2 ${watch(`${el.name}.${item.title}`)==true ? 'bg-blue-600 text-white' : 'border-white'}`}
                                                          onClick={() => {setValue(`${el.name}.${item.title}`, true)}}><i className={`fas fa-check opacity-0 mr-4 ${watch(`${el.name}.${item.title}`)==true && 'opacity-100'}`}></i>SI</button>
                                                      </div>
                                                      {index < el.data.length-1 && <div className="flex justify-center">
                                                          <button className={`mt-6 py-3 px-12 text-white rounded-full ${watch(`${el.name}.${item.title}`)==null ? 'bg-gray-500' : 'bg-green-500'}`} onClick={() => {animateSlide(el.title, index+1)}}>NEXT</button>
                                                      </div>}
                                                  </div>
                                              </div>
                                          )
                                      })}
                                  </div>
                              </div>
                          </div>
                      )
                  }
              })
                }
                <button type="submit" className="w-full bg-blue-600 text-white py-5 tracking-wider text-xl rounded-full mt-4">Enviar</button>
            </form>
        </div>
    )
}

export default Profile;