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
  const [avatarPreview, setAvatarPreview] = useState(null);
  const userId = '66bb2f16c0ba0fcbc28d5fd4';

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/users', { _id: userId });
        setUserData(response.data);
        setAvatarPreview(response.data.avatar); // Set preview avatar
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        setMessage('Lỗi khi lấy dữ liệu người dùng.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (values) => {
    try {
      // Tạo đối tượng dữ liệu để gửi
      const data = {
        _id: userId, // Hoặc bạn có thể lấy giá trị userId từ values nếu cần
        name: values.name,
        email: values.email,
        password: values.password,
        avatar: values.avatar // Đây chỉ là tên file, không phải file thực tế
      };
  
      // Gửi dữ liệu dưới dạng JSON
      const response = await axios.put('http://127.0.0.1:5000/update', data, {
        headers: {
          'Content-Type': 'application/json',
        },
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
          avatar: null,
        }}
        validationSchema={EditProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
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
              <input
                type="file"
                name="avatar"
                className="form-control"
                onChange={(event) => {
                  setFieldValue('avatar', event.currentTarget.files[0]);
                  setAvatarPreview(URL.createObjectURL(event.currentTarget.files[0]));
                }}
              />
              {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />}
              <ErrorMessage name="avatar" component="div" className="error-message" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                Chỉnh sửa
              </button>
              <button type="button" className="btn-back" onClick={onBack}>
                Quay lại
              </button>
            </div>
            {message && <div className="message">{message}</div>}
          </Form>
        )}
      </Formik>
      <style jsx>{`
        .form-container {
          block-size: auto;
          max-inline-size: 500px;
          margin: 0 auto;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          background-color: #f8f9fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-edit-profile h2 {
          margin-block-end: 20px;
          font-size: 28px;
          font-weight: 600;
          color: #333;
          text-align: center;
        }

        .form-group {
          margin-block-end: 20px;
        }

        .form-group label {
          display: block;
          margin-block-end: 8px;
          font-weight: 500;
          color: #495057;
          font-size: 16px;
        }

        .form-control {
          inline-size: 100%;
          padding: 12px;
          border: 2px solid #ced4da;
          border-radius: 8px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-control:focus {
          border-color: #80bdff;
          box-shadow: 0 0 8px rgba(128, 189, 255, 0.25);
          outline: none;
        }

        .error-message {
          color: #e3342f;
          font-size: 14px;
          margin-block-start: 5px;
        }

        .btn-submit {
          background-color: #007bff;
          color: #fff;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          transition: background-color 0.3s, transform 0.3s;
          inline-size: calc(50% - 10px);
          text-align: center;
        }

        .btn-submit:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        .btn-submit:disabled {
          background-color: #6c757d;
        }

        .btn-back {
          background-color: #6c757d;
          color: #fff;
          border: none;
          padding: 12px 25px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          transition: background-color 0.3s, transform 0.3s;
          inline-size: calc(50% - 10px);
          text-align: center;
        }

        .btn-back:hover {
          background-color: #495057;
          transform: translateY(-2px);
        }

        .message {
          margin-block-start: 20px;
          font-size: 16px;
          color: #333;
          text-align: center;
        }

        .avatar-preview {
          margin-block-start: 15px;
          inline-size: 120px;
          block-size: 120px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: block;
          margin: 10px auto;
        }
      `}</style>
    </div>
  );
};

export default FormEditProfile;
