import React, { useState } from 'react';

const Daily = () => {
    // // PRUEBA DE DATOS VARIABLES
    const dataTest1 = [{"id": 1, "status": false}, {"id": 2, "status": false},{"id": 3, "status": true},{"id": 4, "status": false},{"id": 5, "status": false}]
    const [dataTest, setdataTest] = useState(dataTest1)
    

    const updateData = (data) =>{
        const NewArray = dataTest.map(item => {
            if (item.id == data.getAttribute("data-id")){
                item.status = data.checked
            }
            return item
        })
        console.log(NewArray)
        setdataTest(NewArray)

    }
    
    return (
        <div>
            {
                dataTest.map(item =>
                    <div>
                        <label>{item.id}</label>
                        <input type="checkbox" 
                                data-id = {item.id}
                                checked = {item.status}
                                onChange = {
                                    (e) => {updateData(e.target)}
                                }
                        />
                    </div>
                )
            }

        </div>

        
    )
}

export default Daily