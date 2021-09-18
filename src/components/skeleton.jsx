import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const Skeleton = () => {
    return (
        <div className="bg-white rounded p-4">
            <div className="bg-gray-200 w-full py-4"></div>
            <div className="bg-gray-200 w-full py-12 mt-4"></div>
        </div>
    )
}

export default Skeleton