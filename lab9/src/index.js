import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContactsProvider } from "./context/ContactsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContactsProvider>
    <App /> 
  </ContactsProvider>
);


reportWebVitals();
