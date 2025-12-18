import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContactsProvider } from "./context/ContactsContext";
import { Provider } from 'react-redux';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ContactsProvider>
      <App /> 
    </ContactsProvider>
  </Provider>
);


reportWebVitals();