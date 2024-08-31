"use client";

import ChatbotCoshop from "@/components/ChatbotCoshop";
import Error from "@/components/Error";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { getFromLocalStorage } from "@/utils/awesomeFuncs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useFetchPost = (url, payload) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setResponse(json);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [response, error, loading];
};

export default function CoshopChat() {
    const params = useParams();
    const [chatData, setChatData] = useState([]);

    const [data, error, loading] = useFetchPost(
      `https://acpproject021.pythonanywhere.com/api/coshop/chat/history/`,
      { oid: params.urlid }
    );

    useEffect(() => {
        setChatData(data);
    }, [data]);

    useEffect(() => {
        let interval;
        
        const fetchHistory = async () => {
            let url = `https://acpproject021.pythonanywhere.com/api/coshop/chat/history/`;
            
            interval = setInterval(async () => {
                let response = await fetch(
                    `https://acpproject021.pythonanywhere.com/api/coshop/chat/history/`,
                    { method: "POST", body: JSON.stringify({ oid: params.urlid }) }
                );
                response = await response.json();

                setChatData(response);
            }, 2000);
        }

        return () => clearInterval(interval);
    }, []);
    
    if (loading === true) return <Loading />;
    if (error !== null) return <Error message={error} />;

    return (
        <>
            <Header />
            <div className="w-[65%] h-[85vh] mx-auto">
                <ChatbotCoshop chatData={data} />
            </div>
        </>
    );
};
