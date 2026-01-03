import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const pasteview = () => {
  const { id } = useParams();
  const [found, setFound] = useState(null);

  useEffect(() => {
    const pastes = JSON.parse(localStorage.getItem("pastes"));
    setFound(pastes.find((p) => p.id === id));
  }, [id]);
  const copyText = () => {
    toast.success("Copied!",{duration:700})
    navigator.clipboard.writeText(found.content);
  };

  if (!found) return <p className="text-white p-8">Paste not found</p>;
  return (
    <div className="w-full max-w-200 h-[80vh] p-8 no-scroll py-4">
      <div className="flex flex-col text-white placeholder:text-white">
        <div className="border border-neutral-700 bg-black rounded-xl py-3 px-5 text-2xl w-full outline-none mb-4">
          {found.title}
        </div>

        <div className="border border-neutral-700 relative bg-black rounded-xl py-3 px-5 text-sm h-126 outline-none">
          <button
            onClick={copyText}
            className="absolute right-3 top-3 hover:bg-gray-700 p-1 rounded"
          >
            <Copy size={20} />
          </button>
          {found.content}
        </div>
      </div>
    </div>
  );
};

export default pasteview;
