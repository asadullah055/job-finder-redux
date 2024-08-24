import axiosInstance from "./../../utils/axios";
export const getJobs = async () => {
  const response = await axiosInstance.get("/jobs");
  return response.data;
};
export const addJob = async (data) => {
  const response = await axiosInstance.post("/jobs", data, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return response.data;
};
export const updateJob = async ({id, data}) => {
  const response = await axiosInstance.put(`/jobs/${id}`, data, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  return response.data;
};
export const deleteJob = async (id) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
};
export const getSingleJob = async (id) => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  console.log(response);
  
  return response.data;
};
