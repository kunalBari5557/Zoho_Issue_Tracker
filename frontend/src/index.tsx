// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Routes from './Routes/routes';
// import { Toaster } from 'react-hot-toast';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <Routes />
//     <Toaster />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './Routes/routes';
import { Provider } from "react-redux";
import { store } from './Redux/Store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Routes />
    </Provider>
  </React.StrictMode>
);