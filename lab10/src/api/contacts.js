import axios from "axios";

const API_URL = "http://localhost:5000/contacts";


export const fetchContacts = async (params = {}) => {
  const response = await axios.get(API_URL, { params }); 
  return response.data;
};


export const fetchContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
