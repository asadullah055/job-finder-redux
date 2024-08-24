export const filterByType = (job, filter) => {
  switch (filter) {
    case "Internship":
      return job.type === "Internship";
    case "Remote":
      return job.type === "Remote";
    case "Fulltime":
      return job.type === "Full Time";

    default:
      return true;
  }
};
export const filterBySearch = (job, search) => {
  if (search) {
    return job.title.toLowerCase().includes(search.toLowerCase());
  } else {
    return true;
  }
};
export const filterBySort = (job, sort) => {
  if (sort) {
    if (sort === "lowTo") {
      return job.sort((a, b) => Number(a.salary) - Number(b.salary));
    } else if (sort === "highTo") {
      return job.sort((a, b) => Number(b.salary) - Number(a.salary));
    }
  } else {
    return job;
  }
};

export const changeHeader = (filter) => {
  if (filter === "Internship") {
    return (
      <span>
        Available <span className="!text-[#FF5757]">Internship</span>
      </span>
    );
  }
  if (filter === "Fulltime") {
    return (
      <span>
        Available <span className="!text-[#FF8A00]">Full Time</span>
      </span>
    );
  }
  if (filter === "Remote") {
    return (
      <span>
        Available <span className="!text-[#56E5C4]">Remote</span>
      </span>
    );
  }
  return "All Available";
};
