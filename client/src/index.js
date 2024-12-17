import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoute, publicRoutes } from './routes';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
          })}
          {privateRoute.map((route, index) => {
            return <Route key={index} path={route.path} element={route.element} />;
          })}

        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
