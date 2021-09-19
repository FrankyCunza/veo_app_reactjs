import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

const Skeleton = ( { quantity } ) => {

    return (
        <>
        {[...Array(quantity)].map((elementInArray, index) => ( 
            <div className="bg-white rounded-xl p-4 mt-6" key={index}>
                <div className="bg-gray-300 w-full py-4"></div>
                <div className="bg-gray-300 w-full py-12 mt-4"></div>
            </div>
            ) 
        )}
        </>
    )
}

export default Skeleton