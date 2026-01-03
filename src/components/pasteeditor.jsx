import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const pasteeditor = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => {
    if (id) {
      const pastes = JSON.parse(localStorage.getItem("pastes")) || [];
      const paste = pastes.map((paste) => {
        if (id === paste.id) {
          setNote(paste.content);
          setTitle(paste.title);
        }
      });
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const createPaste = () => {
    if (!title.trim() || !note.trim()) {
      toast.error("empty!", { duration: 700 });
      return;
    }

    const paste = {
      title: title,
      content: note,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    const existingPastes = JSON.parse(localStorage.getItem("pastes")) || [];
    let updatedPastes = [];

    if (id) {
      toast.success("Paste updated!", { duration: 700 });
      updatedPastes = existingPastes.map((paste) =>
        paste.id === id ? { ...paste, title: title, content: note } : paste
      );
    } else {
      toast.success("Paste created!", { duration: 700 });

      updatedPastes = [...existingPastes, paste];
    }

    localStorage.setItem("pastes", JSON.stringify(updatedPastes));
    setTitle("");
    setNote("");
  };

  return (
    <div className="w-full max-w-200 h-[80vh] p-8 py-4">
      <form
        className="flex flex-col text-white placeholder:text-white"
        action=""
        onSubmit={submitHandler}
      >
        <div className="flex mb-4  justify-between gap-1">
          <input
            className="border border-neutral-700
    focus:border-white
    focus:shadow-[0_0_0_1px_rgba(59,130,246,0.6),0_20px_40px_rgba(0,0,0,0.8)]
    transition-all duration-300 bg-black rounded-xl py-3 px-5 text-2xl w-[80%]  outline-none"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            type="text"
            placeholder="Title"
          />
          <button
            onClick={createPaste}
            className="bg-black  rounded-xl py-1 px-3 text-lg w-[20%]  border border-neutral-700
    hover:border-white
    hover:shadow-[0_0_0_1px_rgba(59,130,246,0.6),0_20px_40px_rgba(0,0,0,0.8)] active:scale-95
    transition-all duration-300"
          >
            <Plus size={18} className="sm:hidden inline"/>
    <span className="hidden sm:inline">
      {id ? "Update" : "Create"}
    </span>
          </button>
        </div>
        <textarea
          className="border border-neutral-700
    focus:border-white
    focus:shadow-[0_0_0_1px_rgba(59,130,246,0.6),0_20px_40px_rgba(0,0,0,0.8)]
    transition-all duration-300 bg-black rounded-xl py-3 px-5 text-sm outline-none"
          rows={24}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          value={note}
          name=""
          id=""
          placeholder="Paste here..."
        ></textarea>
      </form>
    </div>
  );
};

export default pasteeditor;
