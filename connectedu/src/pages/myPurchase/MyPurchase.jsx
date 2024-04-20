import React from 'react'
import './MyPurchase.scss'
import { Link } from 'react-router-dom';

const MyPurchase = () => {

  const PurchaseTitle = 'This is the Purchase title for the connectEdu';

  return (
    <div className='myCourse'>
      <div className="container">
        <div className="title">
          <h1> My Purchases</h1>
          <Link to='/'>
            <button> Create New Payment </button>
          </Link>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Update</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td className='PurchaseTitle'>
              {PurchaseTitle.length > 30 ? PurchaseTitle.substring(0, 30) + '...' : PurchaseTitle}
            </td>
            <td> 50 </td>
            <td> 123 </td>
            <td>
              <button className='update'>Update</button>
            </td>
            <td>
              <button className='delete'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td> 
              {PurchaseTitle.length > 30 ?PurchaseTitle.substring(0, 30) + '...' :PurchaseTitle}
            </td>
            <td> 50 </td>
            <td> 123 </td>
            <td>
              <button className='update'>Update</button>
            </td>
            <td>
              <button className='delete'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>
              <img src="" alt="" />
            </td>
            <td>
              {PurchaseTitle.length > 30 ?PurchaseTitle.substring(0, 30) + '...' :PurchaseTitle}
            </td>
            <td> 50 </td>
            <td> 123 </td>
            <td>
              <button className='update'>Update</button>
            </td>
            <td>
              <button className='delete'>Delete</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default MyPurchase