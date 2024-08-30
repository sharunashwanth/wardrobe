import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import ReactLoading from "react-loading";
import ChatbotWave from "./ChatbotWave";

const ChatMessage = ({ msg }) => {
  const isUser = msg.by === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-5 py-2 my-2 rounded-xl shadow-md break-words ${
          isUser ? "bg-slate-50" : "bg-[#ffe0b7]"
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: msg.msg }}></div>
      </div>
    </div>
  );
};

export default function ChatbotSearch({ selectedItems, searchResults }) {
  let [chat, setChat] = useState([
    { by: "bot", msg: "<p>Hello! How can I assit you?</p>" },
  ]);

  const [responding, setResponding] = useState(false);
  const [query, setQuery] = useState("");
  const chatEndRef = useRef(null);
  const keyPressRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [chat]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponding(true);
    chat.push({by: "user", msg: query});

    let url = `https://acpproject021.pythonanywhere.com/api/chat/`;
    let payload = {
        "query": query,
        "product": searchResults,
        "history": chat,
        "selected_items": selectedItems
    };

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
    });
    response = await response.json();

    setChat([ ...chat, {by: "bot", msg: response.html} ]);
    setResponding(false);
    setQuery("");   
  };

  return (
    <div className="flex flex-col justify-between min-h-full divide-y-2 px-2">
      <div className="">
        <ChatbotWave />
        {chat.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
        <div ref={chatEndRef} />
        {responding ? (
          <div>
            <div className="w-max bg-[#ffe0b7] float-left clear-right px-5 py-2 my-2 rounded-xl shadow-md">
              <div className="h-6 flex justify-center items-center">
                <ReactLoading type="bubbles" color="#fff" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <form
        className="px-6 py-2 flex justify-between items-center"
        onSubmit={handleSubmit}
      >
        <textarea
          name="query"
          ref={keyPressRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What's on your mind?"
          className="w-[84%] rounded-2xl resize-none border px-4 py-2 text-sm focus:outline-none"
        ></textarea>
        <button
          type="submit"
          disabled={responding ? true:false}
          className="group size-12 text-3xl border text-[#f36a3e] bg-white p-1 rounded-full flex justify-center items-center hover:scale-[1.025] hover:bg-slate-200"
        >
          <IoMdSend className="translate-x-1" />
        </button>
      </form>
    </div>
  );
}
