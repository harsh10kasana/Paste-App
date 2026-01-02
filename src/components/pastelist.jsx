import { Copy, Eye, SquarePen, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const pastelist = () => {
  const [pastes, setPastes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pastes")) || [];
    setPastes(stored);
  }, []);
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  const getPreview = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  const handleDel = (pasteid) => {
    toast.success("Deleted!",{duration: 700});
    const updatedPastes = pastes.filter((paste) => paste.id !== pasteid);

    setPastes(updatedPastes);

    localStorage.setItem("pastes", JSON.stringify(updatedPastes));
  };
  const copyText = (c) => {
    toast.success("Copied!",{duration: 700});
    navigator.clipboard.writeText(c);
  };

  return (
    <div className="w-200 h-[80vh] p-8 py-4 text-white ">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="mb-3 bg-black rounded-xl py-3 px-5 text-2xl w-full outline-none"
        type="text"
        placeholder="Search.."
      />
      <div className="no-scroll">
        {filteredPastes.map((paste) => (
          <div key={paste.id} className="bg-black p-4 rounded-xl mt-1 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{paste.title}</h2>
              <div className="flex justify-between items-center w-40 ">
                <button className=" rounded hover:bg-gray-700 p-1 ">
                  <Link to={`/${paste.id}`}>
                    {" "}
                    <SquarePen size={20} />
                  </Link>
                </button>
                <button className=" rounded hover:bg-gray-700 p-1 ">
                  <Link to={`/pastes/${paste.id}`}>
                    <Eye size={20} />
                  </Link>
                </button>
                <button
                  onClick={() => {
                    copyText(paste.content);
                  }}
                  className=" rounded hover:bg-gray-700 p-1 "
                >
                  <Copy size={20} />
                </button>

                <button
                  onClick={() => {
                    handleDel(paste.id);
                  }}
                  className=" rounded hover:bg-gray-700 p-1 "
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-400 mt-2">
              {getPreview(paste.content, 80)}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(paste.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default pastelist;
