import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100%]">
      <Image className="animate-fadeIn" src={"/floral_art.png"} alt="something" width={100} height={100}/>
      <div>
        <div className="flex space-x-[0.4] text-3xl font-bold uppercase pb-2">
          <span className="inline-block animate-fadeIn delay-[0ms]">A</span>
          <span className="inline-block animate-fadeIn delay-[200ms]">l</span>
          <span className="inline-block animate-fadeIn delay-[300ms]">o</span>
          <span className="inline-block animate-fadeIn delay-[400ms]">h</span>
          <span className="inline-block animate-fadeIn delay-[400ms]">a</span>
          <span className="inline-block animate-fadeIn delay-[500ms]">&nbsp; </span>
          <span className="inline-block animate-fadeIn delay-[500ms]">c</span>
          <span className="inline-block animate-fadeIn delay-[500ms]">a</span>
          <span className="inline-block animate-fadeIn delay-[500ms]">r</span>
          <span className="inline-block animate-fadeIn delay-[500ms]">e</span>
        </div>
        <div className="flex gap-4">
          <Button className="w-full font-bold animate-fadeIn">Dashboard</Button>
          <Button className="w-full font-bold animate-fadeIn">Chatbot</Button>
        </div>
      </div>
    </div>
  );
}
