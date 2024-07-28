import { useEffect, useState } from "react";

const Contact = () => {
  const [Employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('http://localhost:5000/contact');
      const json = await response.json();
      if (response.ok) {
        setEmployees(json);
      }

    }
    fetchEmployees();
  })
  return (
    <>
      <h1>Contact</h1>
      {Employees.length > 0 ? (
        Employees.map(employee =>(
          <div key={employee._id}>
            <h2>{employee.name}</h2>
            <p>{employee.email}</p>
          </div>
        ))
      ):(
        <p>Loading Employees</p>
      )}
    </>
  );
};

export default Contact;