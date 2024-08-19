import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import axios from 'axios';
jest.mock('axios');

test('shows error message when passwords do not match', async () => {
    render(
        <Router>
            <RegisterForm />
        </Router>
    );

    
    fireEvent.change(screen.getByLabelText(/Your name:/i), { target: { value: 'John Doe' } });

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.change(screen.getAllByLabelText(/Password:/i)[0], { target: { value: 'password123' } });

    fireEvent.change(screen.getAllByLabelText(/Confirm Password:/i)[0], { target: { value: 'password456' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
        expect(screen.getByText(/Mật khẩu xác nhận không trùng khớp/i)).toBeInTheDocument();
    });
});

test('shows error message when email is already registered', async () => {
    axios.post.mockResolvedValue({
        data: { result: 'false' }
    });

    render(
        <Router>
            <RegisterForm />
        </Router>
    );


    fireEvent.change(screen.getByLabelText(/Your name:/i), { target: { value: 'John Doe' } });


    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john.doe@example.com' } });

    fireEvent.change(screen.getAllByLabelText(/Password:/i)[0], { target: { value: 'password123' } });

    fireEvent.change(screen.getAllByLabelText(/Confirm Password:/i)[0], { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
        expect(screen.getByText(/Email đã được đăng ký/i)).toBeInTheDocument();
    });
});
