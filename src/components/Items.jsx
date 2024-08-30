import { useFetch } from "@/utils/awesomeHooks";
import React, { useState } from "react";
import Chatbot from "./Chatbot";
import Loading from "./Loading";
import Error from "./Error";
import Category from "./Category";
import { AiTwotoneHeart } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaStar  } from "react-icons/fa";

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
        <table className="flex justify-around w-[90%] text-center  "> 
            <tbody className="border-b dark:border-slate-400">
                {details.map((specs) => {
                    let spec = Object.entries(specs)[0];

                    return <tr className="border-b border-spacing-2 text-left space-x-14 space-y-1 border-s-slate-100 " key={spec[0]}>
                        <th className="">{spec[0]}</th>
                        <td className="float-start  border-b-neutral-50  dark:border-slate-50 py-1">{spec[1]}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>;
}

function Review({ reviewData }) {
    let markup = reviewData.documents.map((review, i) => <div key={i}>
        <h2 className="text-xl px-1  font-mono font-extrabold p-2 flex "><img src="/OIP.jpeg" alt="logo" className="w-12 rounded-full px-2" /> User - {i + 1}</h2>
        <p className="text-lg px-10  py-1 mb-5">{review.review}</p>
    </div>
    );
    
    return <div>
        <h2 className="px-2 py-4 text-xl font-semibold">Reviews</h2>
        <div>{markup}</div>
    </div>
}

function Recommendations({ subCategory }) {
  const [recommendationData, recommendationError, recommendationLoading] = useFetch(
    `https://acpproject021.pythonanywhere.com/api/search/?query=${subCategory}`
  );

  if (recommendationLoading === true) return <Loading />;
  if (recommendationError !== null) return <Error message={recommendationError} />;

  return <Category categoryName="Similar Products" categoryData={recommendationData.results} />
}

const WishList = ({ action, setAction }) => {    
    const handleClick = () => {
        setAction( action !== "wishlist" ? "wishlist" : "none" )
    }
    
    let styles = `text-2xl p-1 rounded-2xl ${action === "wishlist" ? "bg-red-500" : ""}`
    return <button onClick={handleClick} className={styles}>
        <AiTwotoneHeart />
    </button>;
}

const Cart = ({ action, setAction }) => {
    const handleClick = () => {
        setAction( action !== "cart" ? "cart" : "none" )
    }
    
    let styles = `text-2xl font-thin p-1 rounded-2xl ${action === "cart" ? "bg-yellow-500" : ""}`
    return <button onClick={handleClick} className={styles}>
        <MdOutlineShoppingCart />
    </button>;
}

const BuyNow = ({ action, setAction }) => {
    const handleClick = () => {
        setAction( action !== "buy" ? "buy" : "none" )
    }
    
    let styles = `px-4 py-1 rounded-2xl bg-slate-300 ${action === "buy" ? "bg-orange-400" : ""}`
    return <button onClick={handleClick} className={styles}>
        Buy Now
    </button>;
}

const ImageSection = ({ data }) => {
    const [currentImage, setCurrentImage] = useState(data.images[0]);
    
    return <>
        <div className="w-[200px] h-[300px] flex justify-center items-center">
            <img
                src={currentImage}
                className="object-contain size-full rounded-md"
                alt={data.title}
            />
        </div>
        <div className="flex space-x-4 justify-center flex-wrap w-full">
            {data.images.map((image) => {
                return <div key={image} onClick={() => setCurrentImage(image)} className={`size-14 border-2 border-slate-600 border-double p-1 rounded-md cursor-pointer hover:scale-105 hover:bg-slate-300 mb-3 ${image === currentImage ? "bg-slate-300" : ""}`}>
                    <img src={image} alt={image} className="size-full aspect-square object-contain" />
                </div>;
            })}
        </div>
    </>;
}

const RatingStars = ({ rating }) => {
    let markup = [];

    for(let i = 0;i < rating;i++) markup.push(<FaStar key={crypto.randomUUID()} className="text-yellow-400" />);
    for(let i = 0;i < 5 - rating;i++) markup.push(<FaStar key={crypto.randomUUID()} />);

    return <div className="flex items-center">
        <p>Rating: </p>
        <div className="flex">{markup.map(e => e)}</div>
    </div>;
}

export default function Items(props) {
    let data = props.data;
    let TrackItemPageSection = props.TrackItemPageSection;
    let setSectionTimingData = props.setSectionTimingData;
    let action = props.action;
    let setAction = props.setAction;

    const [reviewData, reviewError, reviewLoading] = useFetch(
      `https://acpproject021.pythonanywhere.com/api/reviews/?query=${data.category}`
    );
    
    if (reviewLoading === true) return <Loading />;
    if (reviewError !== null) return <Error message={reviewError} />;
    
    return <>
        <div className="flex space-x-3 h-[85vh] overflow-hidden">
            <div className="w-1/5 bg-slate-100 flex flex-col items-center justify-around">
                <ImageSection data={data} />
            </div>

            <div className="w-[45%] bg-slate-100 shadow-inner px-6 py-8 rounded-md">
                <div className="h-[95%] overflow-scroll space-y-4 no-scroll">
                    <TrackItemPageSection id="item-detail" setSectionTimingData={setSectionTimingData}>
                        <div className="flex flex-col justify-start w-full">
                            <h2 className="text-2xl font-semibold px-2 py-4 mb-2">{data.title}</h2>
                            <div className="flex space-x-4">
                                <div className="space-y-2">
                                    <p className="text-base px-3 font-bold text-gray-500">Brand: {data.brand}</p>
                                    <p className="text-base px-3 font-bold text-gray-500">Category: {data.category}</p>
                                    <p className="text-base px-3 font-bold text-gray-500">Sub Category: {data.sub_category}</p>
                                </div>
                                <div className="px-3">
                                    <p className="text-xl font-bold text-gray-700">Price: ₹{data.price} </p>
                                    <RatingStars rating={getAvgRating(reviewData.ratings)} />
                                </div>
                            </div>
                        </div>
                    </TrackItemPageSection>
                    
                    <TrackItemPageSection id="description" setSectionTimingData={setSectionTimingData}>
                        <h3 className="text-xl font-extrabold px-1 mt-8">Description</h3>
                        <p className="text-md px-1 font-semibold my-6">{data.description}</p>
                    </TrackItemPageSection>
                    <TrackItemPageSection id="specifications" setSectionTimingData={setSectionTimingData}>
                        <h3 className="text-lg font-extrabold px-2 py-3 mb-2">Specifications</h3>
                        <div className="flex items-center justify-center">
                            <ProductDetails details={data.product_details} />
                        </div>
                    </TrackItemPageSection>
                    <TrackItemPageSection id="recommendations" setSectionTimingData={setSectionTimingData}>
                        <Recommendations subCategory={data.sub_category} />
                    </TrackItemPageSection>
                    <TrackItemPageSection id="reviews" setSectionTimingData={setSectionTimingData}>
                        <Review reviewData={reviewData}/>
                    </TrackItemPageSection>
                </div>

                <div className="bottom-0 flex justify-between border-t py-3">
                    <div className="space-x-4">
                        <WishList action={action} setAction={setAction}/>
                        <Cart action={action} setAction={setAction}/>
                    </div>
                    <div>
                        <BuyNow action={action} setAction={setAction}/>
                    </div>
                </div>
            </div>
            
            <div className="w-2/6 min-h-[80vh] overflow-scroll no-scroll">
                <Chatbot productData={data} ratings={reviewData.ratings} />
            </div>
        </div>
    </>
}