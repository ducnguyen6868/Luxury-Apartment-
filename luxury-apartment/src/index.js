import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './js/loader';
import Contact from "./pages/contact";
import DetailProduct from "./pages/detailProduct";
import FormEditProfile from './pages/formEditUser';
import Home from "./pages/home";
import Layout from "./pages/layout";
import ListProducts from "./pages/listProducts";
import reportWebVitals from './reportWebVitals';

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list-apartments" element={< ListProducts />} />
          <Route path="detail-apartments/:id" element={< DetailProduct />} />
          <Route path="contact" element={<Contact />} />
          <Route path="formEditUser" element={<FormEditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
