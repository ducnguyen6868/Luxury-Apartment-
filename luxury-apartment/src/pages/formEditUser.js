// src/pages/FormEditProfile.js
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .required('Mật khẩu là bắt buộc'),
});

const FormEditProfile = ({ onBack }) => {
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  // const userId = '66bb2f16c0ba0fcbc28d5fd4';
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/users', { _id: userId });
        setUserData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        setMessage('Lỗi khi lấy dữ liệu người dùng.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put('http://127.0.0.1:5000/update', {
        ...values,
        id: userId,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };

  if (!userData) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          name: userData.name,
          email: userData.email,
          password: '',
          avatar: userData.avatar,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form-edit-profile">
            <h2>Chỉnh sửa thông tin</h2>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <Field type="text" name="avatar" className="form-control" />
              <ErrorMessage name="avatar" component="div" className="error-message" />
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              Chỉnh sửa
            </button>
            <button type="button" className="btn-back" onClick={onBack}>
              Quay lại
            </button>
            {message && <div className="message">{message}</div>}
          </Form>
        )}
      </Formik>
      <style jsx>{`
        .form-container {
          block-size: 700px;
          max-inline-size: 600px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        .form-edit-profile h2 {
          margin-block-end: 20px;
          font-size: 24px;
          color: #333;
        }

        .form-group {
          margin-block-end: 15px;
        }

        .form-group label {
          display: block;
          margin-block-end: 5px;
          font-weight: bold;
          color: #555;
        }

        .form-control {
          inline-size: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        .error-message {
          color: red;
          font-size: 12px;
        }

        .btn-submit {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .btn-submit:disabled {
          background-color: #ccc;
        }

        .btn-back {
          background-color: #f0f0f0;
          color: #333;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-inline-start: 10px;
        }

        .message {
          margin-block-start: 15px;
          font-size: 16px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default FormEditProfile;
