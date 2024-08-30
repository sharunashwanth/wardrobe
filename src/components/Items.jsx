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
        <div >
            <img src={data.images[0]} className="w-[200px] h-3/4 " alt={data.title} />
            <div className=" flex w-96 ">
                <h2 className="top-1">{data.title}</h2>
                <p>{data.price} Rs</p>
                <p>{data.category}</p>
                <p>{data.description}</p>
                <h3>Specifications</h3>
                <ProductDetails details={data.product_details} />            
                <Review category={data.category}/>
            </div>
            
        </div>
    </>
}