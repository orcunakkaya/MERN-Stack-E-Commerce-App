import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import  store from './redux/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);