import React, { useState, useEffect } from 'react';
import './MyPurchase.scss';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const MyPurchase = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Fetch orders
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
  });

  // State to store user data
  const [usersMap, setUsersMap] = useState({});

  // Fetch user data for each order
  useEffect(() => {
    if (ordersQuery.data) {
      const userIds = Array.from(new Set(ordersQuery.data.flatMap(order => [order.buyerId, order.sellerId])));
      const fetchUsers = async () => {
        try {
          const userResponses = await Promise.all(userIds.map(userId => newRequest.get(`/users/${userId}`)));
          const users = userResponses.map(res => res.data);
          const usersMap = users.reduce((map, user) => {
            map[user.user._id] = user;
            return map;
          }, {});
          setUsersMap(usersMap);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };
      fetchUsers();
    }
  }, [ordersQuery.data]);

  let transactions = [];
  if (ordersQuery.data) {
    transactions = ordersQuery.data.map(order => {
      const buyer = usersMap[order.buyerId];
      const seller = usersMap[order.sellerId];
      if (!buyer || !seller) {
        console.error('User data missing for order:', order);
        return null; // Skip this order if user data is missing
      }
      const isBuyer = currentUser._id === order.buyerId;
      const otherUser = isBuyer ? seller : buyer;

      return {
        date: new Date(order.createdAt).toLocaleDateString(),
        name: otherUser.user.username,
        email: otherUser.user.email,
        course: order.title,
        amount: `RM${order.price.toFixed(2)}`,
        type: isBuyer ? 'Course Enrollment' : 'Course Earnings',
        role: isBuyer ? 'Student' : 'Educator'
      };
    }).filter(Boolean); // Remove null entries
  }

  // State for the selected transaction type and role
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');

  // Filter transactions based on selected type and role
  const filteredTransactions = transactions.filter(transaction =>
    (selectedType === 'All' || transaction.type === selectedType) &&
    (selectedRole === 'All' || transaction.role === selectedRole)
  );

  return (
    <div className='MyPurchase'>
      {ordersQuery.isFetching ? "Loading..." :
        ordersQuery.error ? "Something went wrong!" :
          <div className="container">
            <div className="title">
              <h1>Transaction History</h1>
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
                  <tr key={index} onClick={() => alert(JSON.stringify(transaction))}>
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
      }
    </div>
  );
}

export default MyPurchase;
