import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJob, deleteJob, getJobs, getSingleJob, updateJob } from "./jobsAPI";

const initialState = {
  jobs: [],
  job: {},
  fetching: false,
  isLoading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const jobs = await getJobs();
  return jobs;
});
export const fetchSingleJob = createAsyncThunk(
  "jobs/fetchSingleJob",
  async (id) => {
    const job = await getSingleJob(id);
    return job;
  }
);
export const createJob = createAsyncThunk("jobs/createJob", async (data) => {
  const job = await addJob(data);
  return job;
});
export const editJob = createAsyncThunk(
  "jobs/editJob",
  async ({ id, data }) => {
    const job = await updateJob({ id, data });
    return job;
  }
);
export const removeJob = createAsyncThunk("jobs/removeJob", async (id) => {
  await deleteJob(id);
  return;
});
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    // fetch jobs
    builder
      .addCase(fetchJobs.pending, (state, action) => {
        state.error = null;
        state.fetching = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.error = null;
        state.fetching = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error?.message;
      });
    // fetch single job
    builder
      .addCase(fetchSingleJob.pending, (state, action) => {
        state.error = null;
        state.fetching = true;
      })
      .addCase(fetchSingleJob.fulfilled, (state, action) => {
        state.error = null;
        state.fetching = false;
        state.job = action.payload;
      })
      .addCase(fetchSingleJob.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error?.message;
      });
    // create job
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.error = null;
        state.fetching = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
      });
    // editing job
    builder
      .addCase(editJob.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.isLoading = true;
        state.jobs = state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        );
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
      });
    // remove job
    builder
      .addCase(removeJob.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = true;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
      });
  },
});

export default jobsSlice.reducer