import { useFetch } from "@/utils/awesomeHooks";
import React from "react";

function ProductDetails(props) {
    let details = props.details;
    console.log(details);
    
    return <>
        <table>
            <tbody>
                {details.map((specs) => {
                    let spec = Object.entries(specs)[0];

                    return <tr key={spec[0]}>
                        <th>{spec[0]}</th>
                        <td>{spec[1]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}

function Review(props) {
    let category = props.category;
    let url = `https://acpproject021.pythonanywhere.com/api/reviews/?query=${category}`
    const [data, error, loading] = useFetch(url);

    console.log(url);
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
    
    return <>
        <p>{url}</p>
    </>
}

export default function Items(props) {
    let data = props.data;
    console.log(data);
    
    return <>
        <div className="flex flex-row items-start space-x-4 p-4 border rounded-lg shadow-lg">
            <img 
                src={data.images[0]} 
                className="w-[200px] h-[300px] object-cover" 
                alt={data.title} 
            />
            <div className="flex flex-col justify-start w-full">
                <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                <p className="text-lg font-bold text-gray-700 mb-2">{data.price} Rs</p>
                <p className="text-sm text-gray-500 mb-4">{data.category}</p>
                <p className="text-sm text-gray-600 mb-4">{data.description}</p>
                <h3 className="text-md font-medium mb-2">Specifications</h3>
                <ProductDetails details={data.product_details} />            
                <Review category={data.category}/>
            </div>
        </div>

    </>
}