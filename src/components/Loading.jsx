import React from 'react';
import ReactLoading from 'react-loading';
 
export default function Loading() {
    let type = "bubbles";
    let color = "#67E8F9";
    
    return <div className="h-screen flex justify-center items-center">
        <ReactLoading type={type} color={color} />
    </div>;
}
