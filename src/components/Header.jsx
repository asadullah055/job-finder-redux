import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "../features/filters/filterSlice";
import { changeHeader } from "../utils/helper";

const Header = () => {
  const { filter } = useSelector((state) => state.filters);
  const [filterValue, setFilterValue] = useState({
    sort: "",
    search: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFilterValue({
      ...filterValue,
      [e.target.name]: e.target.value,
    });
  };
  // set filter value
  useEffect(() => {
    dispatch(updateFilter(filterValue));
  }, [filterValue, dispatch]);
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">{changeHeader(filter)} Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            name="search"
            value={filterValue.search}
            onChange={handleChange}
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          onChange={handleChange}
        >
          <option value="">Default</option>
          <option value="lowTo">Salary (Low to High)</option>
          <option value="highTo">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
