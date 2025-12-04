import { createContext, useState, useCallback } from "react";
import { fetchContacts, fetchContactById } from "../api/contacts";

const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadContacts = useCallback(async (params = {}) => {
     setLoading(true);
    try {
      const data = await fetchContacts(params);
      setContacts(data);
    } catch (err) {
      console.error("Failed to load contacts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ContactsContext.Provider value={{ contacts, loading, loadContacts }}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContext;
