import axios from "axios";

const API_URL = "http://localhost:3000/contacts";

/// contacts.js
// GET — всі контакти + фільтри
export const fetchContacts = async (params = {}) => {
  const response = await axios.get(API_URL, { params }); // Axios автоматично додає params як URL-параметри
  return response.data;
};

// GET — один контакт за id
export const fetchContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
