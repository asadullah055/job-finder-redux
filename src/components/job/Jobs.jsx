import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../features/Jobs/jobsSlice";
import { filterBySearch, filterBySort, filterByType } from "../../utils/helper";
import Header from "../Header";
import JobList from "./JobList";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, fetching, error } = useSelector((state) => state.jobs);
  const { filter, search, sort } = useSelector((state) => state.filters);

  // fetch jobs
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs = jobs
    .filter((job) => filterByType(job, filter))
    .filter((job) => filterBySearch(job, search));

  const sortedAndFilteredJobs = filterBySort(filteredJobs, sort);

  let content = null;

  if (error) content = <p>error occured</p>;
  if (!error && fetching) content = <p>Loading.....</p>;
  if (!error && !fetching && jobs.length > 0)
    content =
      sortedAndFilteredJobs?.length > 0 ? (
        sortedAndFilteredJobs.map((job) => <JobList key={job.id} job={job} />)
      ) : (
        <p className="text-white">No Job found</p>
      );

  if (!error && !fetching && jobs.length === 0) content = <p>No Job found</p>;
  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <Header />

        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
};

export default Jobs;
