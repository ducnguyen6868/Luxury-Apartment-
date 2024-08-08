import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import ListProducts from "./pages/listProducts";
import DetailProduct from "./pages/detailProduct";
import Contact from "./pages/contact";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminLogin from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import './index.css';
import './js/loader';
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
          <Route path="searching" element={<ListProducts/>}/>
          <Route path="login" element={<LoginForm/>}/>
          <Route path="register" element={<RegisterForm/>}/>
          
        </Route>
        <Route path='admin' >
          <Route path='login' element={<AdminLogin/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
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
