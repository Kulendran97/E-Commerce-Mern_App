import React, { useState } from "react";
import Logo from "./Logo";
import { IoSearchCircle } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      Navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white ">
      <div className=" h-full  container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden sm:flex items-center w-full justify-between max-w-sm ">
          <input
            type="text"
            placeholder="Search products here.."
            className=" w-full outline-none pl-2 border rounded-full rounded-r-none"
          />
          <div
            className="text-lg min-w-[50px] min-h-[25px] bg-red-600 flex items-center 
          justify-center rounded-r-full text-white cursor-pointer"
          >
            <IoSearchCircle />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className=" text-3xl cursor-pointer"
            onClick={() => setMenuDisplay((preve) => !preve)}
          >
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-30 h-10 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN ? (
                    <Link
                      to={"/admin-panel/all-users"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link to={""}>Profile</Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <div className=" text-3xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className=" bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 ">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
