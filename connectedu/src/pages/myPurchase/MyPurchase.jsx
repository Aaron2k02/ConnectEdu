import React from 'react'
import './MyPurchase.scss'
import { Link } from 'react-router-dom';

const MyPurchase = () => {

  const PurchaseDate = '2 May 2024'
  const CustomerName = 'John Doe';
  const CustomerEmail = 'customer@email.com';
  const CourseTitle = 'Mobile App Development';
  const CoursePrice = 'RM59.99'

  return (
    <div className='MyPurchase'>
      <div className="container">
        <div className="title">
          <h1> Transaction History </h1>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course Title</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>
                {PurchaseDate}
              </td>
              <td>
                {CustomerName}
              </td>
              <td> {CustomerEmail} </td>
              <td> {CourseTitle} </td>
              <td>
                {CoursePrice}
              </td>
            </tr>
            <tr>
              <td>
              {PurchaseDate}
              </td>
              <td>
                {CustomerName}
              </td>
              <td> {CustomerEmail} </td>
              <td> {CourseTitle} </td>
              <td>
                {CoursePrice}
              </td>
            </tr>
            <tr>
              <td>
              {PurchaseDate}
              </td>
              <td>
                {CustomerName}
              </td>
              <td> {CustomerEmail} </td>
              <td> {CourseTitle} </td>
              <td>
                {CoursePrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyPurchase