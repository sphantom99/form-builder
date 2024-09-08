import axios from "axios";

export const submitCreateForm = async (data: any) => {
  return axios.post(`${import.meta.env.VITE_APP_API_URL}/forms`, data);
};

export const submitForm = async (answers: { data: any; formId: string }) => {
  return axios.post(
    `${import.meta.env.VITE_APP_API_URL}/users/1/forms/`,
    answers
  );
};
