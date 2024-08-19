import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const BookingFormSchema = Yup.object().shape({
  time: Yup.string().required('Thời gian là bắt buộc'),
  status: Yup.string().required('Trạng thái là bắt buộc'),
});

const BookingForm = ({ userId, apartmentId, onBack }) => {
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Gửi dữ liệu bằng phương thức POST
      const response = await axios.post('http://127.0.0.1:5000/bookings', {
        ...values,      // { time: 'giá trị time', status: 'giá trị status' }
        userId,         // userId: 'giá trị userId'
        apartmentId,    // apartmentId: 'giá trị apartmentId'
      });
  
      // Cập nhật thông báo thành công hoặc thông báo lỗi
      setStatus(response.data.message);
      if (response.data.message === 'Hẹn lịch thành công') {
        // Điều hướng về trang home sau khi cập nhật thành công
        window.location.href = '/';
      }
    } catch (error) {
      if (error.response) {
        setStatus(error.response.data.message);
      } else {
        setStatus('Có lỗi xảy ra, vui lòng thử lại.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div style={styles.bookingContainer}>
      <Formik
        initialValues={{ time: '', status: 'pending' }}
        validationSchema={BookingFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form style={styles.bookingForm}>
            <div style={styles.formGroup}>
              <label htmlFor="time" style={styles.label}>Thời gian</label>
              <Field type="datetime-local" name="time" style={styles.formControl} />
              <ErrorMessage name="time" component="div" style={styles.errorMessage} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="status" style={styles.label}>Trạng thái</label>
              <Field as="select" name="status" style={styles.formControl}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </Field>
              <ErrorMessage name="status" component="div" style={styles.errorMessage} />
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" disabled={isSubmitting} style={{ ...styles.btn, ...styles.btnPrimary }}>
                Đặt lịch
              </button>
              <button type="button" onClick={()=>{ window.location.href = '/';}} style={{ ...styles.btn, ...styles.btnSecondary }}>
                Quay lại
              </button>
            </div>
            
            {status && <div style={styles.statusMessage}>{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;

const styles = {
  bookingContainer: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
  bookingForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
  },
  formControl: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ced4da',
    borderRadius: '10px',
    fontSize: '1em',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.3s ease',
  },
  btn: {
    padding: '12px 25px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s ease',
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  btnPrimaryHover: {
    backgroundColor: '#0056b3',
  },
  btnSecondary: {
    backgroundColor: '#6c757d',
    color: 'white',
  },
  errorMessage: {
    color: '#e3342f',
    fontSize: '0.9em',
    marginTop: '5px',
  },
  statusMessage: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    color: '#155724',
    backgroundColor: '#d4edda',
    fontSize: '1em',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};
