import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateFilter } from "../features/filters/filterSlice";

const Layout = ({ children }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateFilter({ filter }));
    if (filter) {
      navigate("/");
    }
  }, [filter, dispatch]);

  return (
    <>
      <nav className="max-w-[90rem] mx-auto py-4 fixed top-0 w-full left-1/2 -translate-x-1/2 px-4 md:px-0">
        <img src="/images/logo.svg" />
      </nav>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8">
        <div className="sidebar">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  onClick={() => setFilter("")}
                  to={"/"}
                  className="main-menu menu-active"
                >
                  <i className="fa-solid fa-briefcase"></i>
                  <span> All Available Jobs</span>
                </Link>
                <ul className="space-y-6 lg:space-y-2 ">
                  <li>
                    <span
                      onClick={() => setFilter("Internship")}
                      role="button"
                      tabIndex="0"
                      className="sub-menu"
                    >
                      <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                      Internship
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setFilter("Fulltime")}
                      role="button"
                      tabIndex="0"
                      className="sub-menu"
                    >
                      <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                      Full Time
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => setFilter("Remote")}
                      role="button"
                      tabIndex="0"
                      className="sub-menu"
                    >
                      <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                      Remote
                    </span>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  to="/jobs/create"
                  className="main-menu"
                  id="lws-addJob-menu"
                >
                  <i className="fa-solid fa-file-circle-plus"></i>
                  <span>Add NewJob</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
