import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './Store/store.js';
import { Provider } from 'react-redux';
import { fetchUserData } from './features/users/usersSlice';
import { fetchPostData } from './features/posts/postSlice';
import {BrowserRouter} from 'react-router-dom'

store.dispatch(fetchPostData())
store.dispatch(fetchUserData())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>    
    </BrowserRouter>
  </React.StrictMode>
);

