import { DocumentData } from "firebase/firestore";
import { useState } from "react";

type Props = {
    message: DocumentData;
};

function Message({ message }: Props){
    const isChatGPT = message.user.name === "ChatGPT";
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      const el = document.createElement("textarea");
      el.value = message.text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
  }, 2000);
};

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#2f3546] whitespace-pre-wrap font-semibold break-words"}`}>
        <div className="flex space-x-5 px-10 max-w-4xl mx-auto">
            <img src={message.user.avatar} alt="Avatar" className="h-8 w-8 rounded" />
            <p className="px-5 py-3 bg-[#0a0e18] rounded-lg text-sm relative">
              {message.text}
                {isChatGPT && (
                <button className="absolute top-0 right-0 px-4 py-2 m-1 text-xs text-gray-300 bg-slate-800 rounded hover:bg-slate-900 shadow-md" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </button>
                )}
            </p>
        </div>
    </div>
  );
}

export default Message;