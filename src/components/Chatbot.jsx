import React from "react";

export default function Chatbot({ productData, ratings }) {

    
    return (
        <div className="flex flex-col justify-between min-h-full">
            <div>
                <div>
                    <p>Bot</p>
                </div>
                <div>
                    <p>User</p>
                </div>
            </div>
            <form className="bg-blue-500">
                <input type="text" />
                <input type="submit" value="Submit  " />
            </form>
        </div>
    );
};
