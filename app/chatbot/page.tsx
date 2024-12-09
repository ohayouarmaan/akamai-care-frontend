"use client";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
    { _type: typeOfMessage.bot, content: "Hello" },
    { _type: typeOfMessage.user, content: "Hello x 2" }
  ]);
  const textRef = useRef<HTMLTextAreaElement>(null);
  return <div className="h-[100vh] w-full items-center justify-center">
    <div className="flex flex-col items-center justify-center h-[100vh] relative">
      <div className="chat-window h-full w-[70%] flex flex-col items-end">
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
        <Textarea ref={textRef} placeholder="Type your message here." className="w-[60vw] bottom-10"/>
        <Button onClick={(e) => {
          setMessageState([...messagesState, {
            _type: typeOfMessage.user,
            content: textRef.current?.value || ""
          }]);
          textRef.current!.value = "";
        }} className="h-[60px] w-[10%]">Send</Button>
      </div>
    </div>
  </div>
}
