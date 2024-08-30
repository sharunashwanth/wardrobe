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

function Review({ reviewData }) {
    let markup = reviewData.documents.map((review) => <>
        <p>{review.review}</p>
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
        <div className="flex space-x-3 h-[90vh] overflow-hidden">
            <div className="w-1/5 bg-slate-300">
                <img
                    src={data.images[0]}
                    className="w-[200px] h-[300px] object-cover"
                    alt={data.title}
                />
            </div>

            <div className="w-[56%] bg-slate-300 overflow-scroll no-scroll">
                <TrackItemPageSection id="item-detail" setSectionTimingData={setSectionTimingData}>
                    <div className="flex flex-col justify-start w-full">
                        <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
                        <p className="text-lg font-bold text-gray-700 mb-2">{data.price} Rs</p>
                        <p className="text-sm text-gray-500 mb-4">{data.brand}</p>
                        <p className="text-sm text-gray-500 mb-4">{data.category}</p>
                        <p className="text-sm text-gray-500 mb-4">{data.sub_category}</p>
                        <p className="text-sm text-gray-500 mb-4">Rating: {getAvgRating(reviewData.ratings)}</p>
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
                    <h2>Reviews</h2>
                    <Review reviewData={reviewData}/>
                </TrackItemPageSection>

                <TrackItemPageSection id="reviews" setSectionTimingData={setSectionTimingData}>
                    <Recommendations subCategory={data.sub_category} />
                </TrackItemPageSection>

                <div className="fixed bottom-0">
                    <button onClick={() => setAction("wishlist")}>Wishlist</button>
                    <button onClick={() => setAction("cart")}>Add to Cart</button>
                    <button onClick={() => setAction("buy")}>Buy Now</button>
                </div>
            </div>
            
            <div className="w-2/6 h-[200vh] overflow-scroll bg-slate-300 no-scroll">
                <Chatbot productData={data} ratings={reviewData.ratings} />
            </div>
        </div>

    </>
}