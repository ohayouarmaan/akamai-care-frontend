"use client";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link";
import { useState, useRef } from "react";
import { text } from "stream/consumers";

enum typeOfMessage {
  bot,
  user 
}

type messageType = {
  _type: typeOfMessage;
  content: string;
};

export default function () {
  const [ messagesState, setMessageState ] = useState<messageType[]>([
  ]);
  const textRef = useRef<HTMLTextAreaElement>(null);
  return <div className="h-[100vh] w-full items-center justify-center">
    <div className="flex flex-col items-center justify-center h-[100vh] relative">
        <div className="absolute flex flex-col gap-4 top-10 items-end right-10">
          <Link className="grow-1" href="/">
            <Button className="font-bold grow-1 text-white bg-black">Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="font-bold text-white bg-black">Dashboard</Button>
          </Link>
        </div>
      <div className="chat-window h-[60vh] overflow-scroll w-[70%] flex flex-col items-end">
        {
          messagesState.map(message => <p key={message.content} className={`p-4 m-2 max-w-[40%] text-white inline-block rounded-[12px] min-w-[5%] font-bold ${message._type == typeOfMessage.user ? "bg-[blue] text-left justify-self-start text-right": "bg-[black]"}`} style={{
            alignSelf: message._type == typeOfMessage.user ? "end" : "start"
          }}>
            {
              message.content
            }
          </p>)
        }
      </div>
      <div className="flex absolute bottom-10">
        <Textarea onKeyDown={(e) => {
            if(e.keyCode == 13 && e.shiftKey == false) {
          const currentText = textRef.current?.value || ""
          setMessageState(msg => [...msg, {
            _type: typeOfMessage.user,
            content: currentText
          }]);
          const url = `https://oreonmayo-akamaicare.hf.space/chatbot`;
            const data = { query: currentText };
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Send the query in the correct format
          })
          .then((response) => {
            if (!response.ok) {
              setMessageState(msg => [...msg, {
                _type: typeOfMessage.bot,
                content: "Unfortunately the server responded with not ok" 
              }]);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response from server:", data);
            setMessageState(msg => [...msg, {
              _type: typeOfMessage.bot,
              content: data.response.text
            }])
          })
          .catch((error) => {
            console.error("Error during fetch:", error);
          });
          textRef.current!.value = "";

            }
        }} ref={textRef} placeholder="Type your message here." className="w-[60vw] bottom-10"/>
        <Button onClick={async (e) => {
          const currentText = textRef.current?.value || ""
          setMessageState(msg => [...msg, {
            _type: typeOfMessage.user,
            content: currentText
          }]);
          const url = `http://localhost:8000/chatbot`;
            const data = { query: currentText };
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Send the query in the correct format
          })
          .then((response) => {
            if (!response.ok) {
              setMessageState(msg => [...msg, {
                _type: typeOfMessage.bot,
                content: "Unfortunately the server responded with not ok" 
              }]);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response from server:", data);
            setMessageState(msg => [...msg, {
              _type: typeOfMessage.bot,
              content: data.response.text
            }])
          })
          .catch((error) => {
            console.error("Error during fetch:", error);
          });
          textRef.current!.value = "";
        }} className="h-[60px] w-[10%]">Send</Button>
      </div>
    </div>
  </div>
}
