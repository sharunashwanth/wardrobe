import { useFetch } from "@/utils/awesomeHooks";
import React from "react";
import Chatbot from "./Chatbot";
import Loading from "./Loading";
import Error from "./Error";
import Category from "./Category";

const getAvgRating = (ratings) => {
    let one = 0;
    let _one = 0;

    for(let rating of ratings) {
        if (rating === 1) one++;
        if (rating === -1) _one++;
    }

    return parseInt( (one / (one + _one)) * 5 );    
};

function ProductDetails(props) {
    let details = props.details;
    
    return <>
        <table className="flex justify-around w-full text-center  "> 
            <tbody className="border-b dark:border-slate-400">
                {details.map((specs) => {
                    let spec = Object.entries(specs)[0];

                    return <tr className="border-b border-spacing-2 text-left space-x-60 space-y-1 border-s-slate-100 " key={spec[0]}>
                        <th className="">{spec[0]}</th>
                        <td className="float-start  border-b-neutral-50  dark:border-slate-50  py-4">{spec[1]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}

function Review({ reviewData }) {
    let markup = reviewData.documents.map((review, i) => <>
        <h2 className="text-xl px-1  font-mono font-extrabold py-2  flex "><img src="/OIP.jpeg" alt="logo" className="w-12 rounded-full px-2" /> User - {i + 1}</h2>
        <p className="text-lg px-10  py-1 mb-5">{review.review}</p>
    </>
    );
    
    return <div>{markup}</div>
}

function Recommendations({ subCategory }) {
  const [recommendationData, recommendationError, recommendationLoading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/search/?query=${subCategory}`
  );

  if (recommendationLoading === true) return <Loading />;
  if (recommendationError !== null) return <Error message={recommendationError} />;

  console.log(recommendationData);
  return <Category categoryName="Similar Products" categoryData={recommendationData.results} />
}

export default function Items(props) {
    let data = props.data;
    let TrackItemPageSection = props.TrackItemPageSection;
    let setSectionTimingData = props.setSectionTimingData;
    let setAction = props.setAction;

    const [reviewData, reviewError, reviewLoading] = useFetch(
      `https://acpproject021.pythonanywhere.com/api/reviews/?query=${data.category}`
    );
    
    if (reviewLoading === true) return <Loading />;
    if (reviewError !== null) return <Error message={reviewError} />;
    
    return <>
        <div className="flex space-x-3 h-[85vh] overflow-hidden">
            <div className="w-1/5 bg-slate-300">
                <img
                    src={data.images[0]}
                    className="w-[200px] h-[300px] object-cover"
                    alt={data.title}
                />
            </div>

            <div className="w-[45%] bg-slate-100 shadow-inner rounded-sm px-6 py-8">
                <div className="h-[95%] overflow-scroll space-y-4 no-scroll">
                    <TrackItemPageSection id="item-detail" setSectionTimingData={setSectionTimingData}>
                        <div className="flex flex-col justify-start w-full">
                            <h2 className="text-2xl font-semibold px-2    py-4 mb-2">{data.title}</h2>
                            <p className="text-2xl  font-bold px-4 py-2 text-gray-700 mb-2">₹{data.price} </p>
                            <p className="text-base px-3 font-bold text-gray-500 mb-4">Brand:{data.brand}</p>
                            <p className="text-base px-3 font-bold text-gray-500 mb-4">Category:{data.category}</p>
                            <p className="text-base px-3 font-bold text-gray-500 mb-4">Sub_Category:{data.sub_category}</p>
                            <p className="text-base px-3 font-bold text-gray-500 mb-4">Rating: {getAvgRating(reviewData.ratings)}</p>
                        </div>
                    </TrackItemPageSection>
                    
                    <TrackItemPageSection id="description" setSectionTimingData={setSectionTimingData}>
                        <p className="text-lg px-1 font-extrabold   mb-9">{data.description}</p>
                    </TrackItemPageSection>
                    <TrackItemPageSection id="specifications" setSectionTimingData={setSectionTimingData}>
                        <h3 className="text-lg font-extrabold px-2 py-5 font-medium mb-2">Specifications</h3>
                        <ProductDetails details={data.product_details} />
                    </TrackItemPageSection>
                    <TrackItemPageSection id="reviews" setSectionTimingData={setSectionTimingData}>
                        <Review reviewData={reviewData}/>
                    </TrackItemPageSection>
                    <TrackItemPageSection id="recommendations" setSectionTimingData={setSectionTimingData}>
                        <Recommendations subCategory={data.sub_category} />
                    </TrackItemPageSection>
                </div>

                <div className="bottom-2">
                    <button onClick={() => setAction("wishlist")}>Wishlist</button>
                    <button onClick={() => setAction("cart")}>Add to Cart</button>
                    <button onClick={() => setAction("buy")}>Buy Now</button>
                </div>
            </div>
            
            <div className="w-2/6 min-h-[80vh] overflow-scroll bg-slate-300 no-scroll">
                <Chatbot productData={data} ratings={reviewData.ratings} />
            </div>
        </div>

    </>
}