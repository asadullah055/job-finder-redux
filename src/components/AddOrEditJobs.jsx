import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createJob, editJob, fetchSingleJob } from "../features/Jobs/jobsSlice";

const initialState = {
  title: "",
  type: "",
  salary: "",
  deadline: "",
};

const AddOrEditJobs = () => {
  const [jobData, setJobData] = useState(initialState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const { job } = useSelector((state) => state.jobs);

  const handleChange = (e) => {
    setJobData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleJob(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      setJobData({
        title: job.title || "",
        type: job.type || "",
        salary: job.salary || "",
        deadline: job.deadline || "",
      });
    } else {
      setEditMode(false);
    }
  }, [id, job, editMode]);
  const handleCreateJob = (e) => {
    e.preventDefault();
    dispatch(createJob(jobData));

    setJobData(initialState);
    navigate("/");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      editJob({
        id,
        data: jobData,
      })
    );
    setJobData(initialState);
    navigate("/");
  };
  const cancelEditMode = () => {
    console.log(initialState);

    setJobData(initialState);
    setEditMode(false);
    navigate("/");
  };
  return (
    <div className="lg:pl-[14rem] mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <h1 className="mb-10 text-center lws-section-title">
          {" "}
          {editMode ? "Edit Job" : "Add New Job"}
        </h1>

        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={editMode ? handleUpdate : handleCreateJob}
            className="space-y-6"
          >
            <div className="fieldContainer">
              <label
                htmlFor="lws-JobTitle"
                className="text-sm font-medium text-slate-300"
              >
                Job Title
              </label>
              <select
                onChange={handleChange}
                id="lws-JobTitle"
                name="title"
                value={jobData.title}
                required
              >
                <option value="" hidden>
                  Select Job
                </option>
                <option>Software Engineer</option>
                <option>Software Developer</option>
                <option>Full Stack Developer</option>
                <option>MERN Stack Developer</option>
                <option>DevOps Engineer</option>
                <option>QA Engineer</option>
                <option>Product Manager</option>
                <option>Social Media Manager</option>
                <option>Senior Executive</option>
                <option>Junior Executive</option>
                <option>Android App Developer</option>
                <option>IOS App Developer</option>
                <option>Frontend Developer</option>
                <option>Frontend Engineer</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobType">Job Type</label>
              <select
                onChange={handleChange}
                id="lws-JobType"
                name="type"
                value={jobData.type}
                required
              >
                <option value="" hidden>
                  Select Job Type
                </option>
                <option>Full Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobSalary">Salary</label>
              <div className="flex border rounded-md shadow-sm border-slate-600">
                <span className="input-tag">BDT</span>
                <input
                  type="number"
                  name="salary"
                  id="lws-JobSalary"
                  required
                  className="!rounded-l-none !border-0"
                  placeholder="20,00,000"
                  onChange={handleChange}
                  value={jobData.salary}
                />
              </div>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobDeadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-JobDeadline"
                required
                onChange={handleChange}
                value={jobData.deadline}
              />
            </div>

            <div className="text-right">
              {editMode && (
                <button
                  onClick={cancelEditMode}
                  type="submit"
                  className="cursor-pointer btn btn-danger w-fit mr-2"
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                {editMode ? "Update Job" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddOrEditJobs;
