import React from 'react';
import './userdet.css';
import UserDatadetls from './UserDatadetls';


const UserDet = () => {
  return (
    <>
      <div className="container">
        <div className="head-title">
          <div className="left">
            <h2>User Management</h2>

          </div>
        </div>
        <div className="table-data">

          <UserDatadetls />
        </div>
      </div>
    </>
  )
}

export default UserDet