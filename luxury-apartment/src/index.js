import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from './components/Admin/Login';
import Contact from "./components/User/Contact";
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import './index.css';
import './js/loader';
import Dashboard from './pages/Admin/Dashboard';
import AdminDetailApartment from './pages/Admin/DetailsApartment';
import LayoutAdmin from './pages/Admin/Layout';
import AdminApartment from './pages/Admin/ListApartment';
import DetailsApartment from "./pages/User/DetailApartment";
import Home from "./pages/User/home";
import Layout from "./pages/User/layout";
import ListApartments from "./pages/User/ListApartments";
import BookingFormSchema from './pages/User/ScheduAppointment';
import FormEditProfile from './pages/User/UserEditForm';
import reportWebVitals from './reportWebVitals';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list-apartments" element={< ListApartments />} />
          <Route path="detail-apartments/:id" element={< DetailsApartment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="searching" element={<ListApartments />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="formEditProfile" element={<FormEditProfile />} />
          <Route path="bookingFormSchema" element={<BookingFormSchema />} />
          <Route path="register" element={<RegisterForm />} />


        </Route>
        <Route path='admin/login' element={<AdminLogin />} />
        <Route path='admin' element={<LayoutAdmin/>}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='apartment' element={<AdminApartment />} />
          <Route path='apartment/:id' element={<AdminDetailApartment />} />        
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
