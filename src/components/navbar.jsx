import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-3 justify-start items-center w-184 px-5 py-3 mt-4 bg-black rounded-xl border border-neutral-700 ">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `border border-black hover:border hover:border-white rounded-xl bg-black transition duration-300  px-2 py-1 ${
            isActive ? "bg-white text-black" : "text-white"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `border border-black hover:border hover:border-white rounded-xl bg-black transition duration-300  px-2 py-1 ${
            isActive ? "bg-white text-black" : "text-white"
          }`
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
