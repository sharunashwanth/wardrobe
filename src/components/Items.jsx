import { useFetch } from "@/utils/awesomeHooks";
import React from "react";
import Chatbot from "./Chatbot";

function ProductDetails(props) {
    let details = props.details;
    
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
    
    if ((loading === true) || (error !== null)) return <p>No review found</p>;
    
    return <>
        <p>{url}</p>
    </>
}

export default function Items(props) {
    let data = props.data;
    let TrackItemPageSection = props.TrackItemPageSection;
    let setSectionTimingData = props.setSectionTimingData;
    let setAction = props.setAction;
    
    return <>
        <div className="flex space-x-3 h-[90vh] overflow-hidden">
            <div className="w-[360px] bg-slate-300">
                <img
                    src={data.images[0]}
                    className="w-[200px] h-[300px] object-cover"
                    alt={data.title}
                />
            </div>

            <div className=" bg-slate-300">
                <TrackItemPageSection id="item-detail" setSectionTimingData={setSectionTimingData}>
                    <div className="flex flex-col justify-start w-full">
                        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                        <p className="text-lg font-bold text-gray-700 mb-2">{data.price} Rs</p>
                        <p className="text-sm text-gray-500 mb-4">{data.category}</p>
                    </div>
                </TrackItemPageSection>
                
                <TrackItemPageSection id="description" setSectionTimingData={setSectionTimingData}>
                    <p className="text-sm text-gray-600 mb-4">{data.description}</p>
                </TrackItemPageSection>

                <TrackItemPageSection id="specifications" setSectionTimingData={setSectionTimingData}>
                    <h3 className="text-md font-medium mb-2">Specifications</h3>
                    <ProductDetails details={data.product_details} />
                </TrackItemPageSection>

                <TrackItemPageSection id="reviews" setSectionTimingData={setSectionTimingData}>
                    <Review category={data.category}/>
                </TrackItemPageSection>

                <div className="fixed bottom-0">
                    <button onClick={() => setAction("wishlist")}>Wishlist</button>
                    <button onClick={() => setAction("cart")}>Add to Cart</button>
                    <button onClick={() => setAction("buy")}>Buy Now</button>
                </div>
            </div>
            
            <div className="w-[400px] h-[200vh] overflow-scroll bg-slate-300">
                <Chatbot />
            </div>
        </div>

    </>
}