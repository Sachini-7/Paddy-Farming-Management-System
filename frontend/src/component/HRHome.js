import React from 'react';
import { Link } from 'react-router-dom';
import './styles/CustomerList.css';

function HRHome() {
  return (
    <div>
        <h1>Welcome, HR Manager!</h1>
        <Link to="/customer-list">
            <button className="custom-button">Get Customer List from here</button>
        </Link>
        <Link to="/deleted-customer-list">
        <button className="custom-button">Get Deleted Customer List from here</button>
      </Link>
    </div>

  );
}

export default HRHome;
