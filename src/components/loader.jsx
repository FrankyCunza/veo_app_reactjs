import React from 'react';

const Loader = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-20">
            <div className="flex flex-col justify-center items-center text-gray-700">
                <i className="fas fa-spinner fa-spin text-4xl flex w-max"></i>
                <h3 className="text-3xl mt-4 font-medium tracking-wide">Cargando</h3>
            </div>
        </div>
    )
}

export default Loader;