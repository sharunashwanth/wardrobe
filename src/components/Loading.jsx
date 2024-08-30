import React from 'react';
import ReactLoading from 'react-loading';
 
export default function Loading() {
    let type = "bubbles";
    let color = "#fb923c";
    
    return <div className="h-screen flex justify-center items-center">
        <ReactLoading type={type} color={color} />
    </div>;
}
