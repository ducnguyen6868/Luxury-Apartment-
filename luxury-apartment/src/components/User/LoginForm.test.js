// LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { jest } from '@jest/globals';

// Mock axios
jest.mock('axios');


test('calls handleSubmit with the correct email and password when form is submitted', async () => {
    const mockPost = jest.fn().mockResolvedValue({
        data: { success: true, token: 'mockToken' }
    });
    axios.post = mockPost;

    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );

    // Nhập tên đăng nhập
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@gmail.com' } });

    // Nhập mật khẩu
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });

    // Nhấn nút đăng nhập
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Đợi cho axios.post được gọi
    await waitFor(() => expect(mockPost).toHaveBeenCalledWith('http://localhost:5000/login', { email: 'test@gmail.com', password: 'password' }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }));
});

test('displays error message when login fails', async () => {
    axios.post = jest.fn().mockResolvedValue({ data: { success: false } });

    render(
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );

    // Nhập tên đăng nhập
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@gmail.com' } });

    // Nhập mật khẩu
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });

    // Nhấn nút đăng nhập
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Đợi cho thông báo lỗi hiển thị
    await waitFor(() => expect(screen.getByText(/Email hoặc mật khẩu không chính xác !/i)).toBeInTheDocument());
});
