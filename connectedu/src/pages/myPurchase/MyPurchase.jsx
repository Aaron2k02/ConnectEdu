import React from 'react'
import './MyPurchase.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react'

const MyPurchase = () => {

  // dummy data
  const transactions = [
    {
      date: '2 May 2024',
      name: 'John Doe',
      email: 'customer@email.com',
      course: 'Mobile App Development',
      amount: 'RM59.99',
      type: 'Course Enrollment',
      role: 'Student'
    },
    {
      date: '3 May 2024',
      name: 'Jane Smith',
      email: 'jane@email.com',
      course: 'Web Design Basics',
      amount: 'RM49.99',
      type: 'Course Enrollment',
      role: 'Student'
    },
    {
      date: '4 May 2024',
      name: 'Alice Johnson',
      email: 'alice@email.com',
      course: 'Advanced Python Programming',
      amount: 'RM69.99',
      type: 'Course Enrollment',
      role: 'Educator'
    },
    {
      date: '5 May 2024',
      name: 'Bob Brown',
      email: 'bob@email.com',
      course: 'Data Science with R',
      amount: 'RM79.99',
      type: 'Course Earnings',
      role: 'Educator'
    },
    {
      date: '6 May 2024',
      name: 'Charlie Davis',
      email: 'charlie@email.com',
      course: 'Introduction to JavaScript',
      amount: 'RM39.99',
      type: 'Course Enrollment',
      role: 'Student'
    }
  ];

  //State for the selected transaction type and role
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  //Filter transactions based on selected type and role
  const filteredTransactions = transactions.filter(transaction =>
    (selectedType === 'All' || transaction.type === selectedType) &&
    (selectedRole === 'All' || transaction.role === selectedRole)
  );

  return (
    <div className='MyPurchase'>
      <div className="container">
        <div className="title">
          <h1> Transaction History </h1>
        </div>

        {/* dropdowns for selecting transaction type and role */}
        <div>
          <select id="transactionType" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Course Enrollment">Course Enrollment</option>
            <option value="Course Earnings">Course Earnings</option>
          </select>
          <select id="transactionRole" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="Student">Student</option>
            <option value="Educator">Educator</option>
          </select>
        </div>

        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Price</th>
              <th>Type</th>
              <th>Role</th>
            </tr>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}
                onClick={() => alert(JSON.stringify(transaction))}>
                <td>{transaction.date}</td>
                <td>{transaction.name}</td>
                <td>{transaction.email}</td>
                <td>{transaction.course}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyPurchase;