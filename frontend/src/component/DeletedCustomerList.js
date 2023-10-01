import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/CustomerList.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

function DeletedCustomerList() {
  const [deletedCustomers, setDeletedCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDeletedCustomers, setFilteredDeletedCustomers] = useState([]);

  useEffect(() => {
    // Fetch deleted customer list from the server
    axios
      .get('http://localhost:8070/customer/fetchDeletedCustomers')
      .then((response) => {
        setDeletedCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching deleted customer list', error);
      });
  }, []);

  useEffect(() => {
    // Filter deleted customers based on the search query
    const filtered = deletedCustomers.filter((customer) =>
      customer.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDeletedCustomers(filtered);
  }, [searchQuery, deletedCustomers]);

  // Function to handle changes to the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to download deleted customer list as PDF
  const downloadDeletedCustomerList = () => {
    const doc = new jsPDF();

    const text = 'All Deleted Customers';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF
  doc.text(text, centerX, 10);

    // Define the header row with column names
    const header = ['Name', 'NIC', 'Username', 'Phone', 'Address', 'LandOwner Name', 'Size'];

    // Define an empty array to hold the table data
    const data = [];

    // Push deleted customer data to the data array
    filteredDeletedCustomers.forEach((customer) => {
      // Combine the address fields into one column
      const address = `${customer.no}, ${customer.street}, ${customer.city}`;
      const name = `${customer.fname} ${customer.lname}`

      const rowData = [
        name,
        customer.nic,
        customer.username,
        customer.phone,
        address, // Use the combined address field
        customer.landOwnerName,
        customer.feildSize,
      ];

      data.push(rowData);
    });

    // Auto-generate the table based on the data
    doc.autoTable({
      head: [header], // Add the header row only once
      body: data,
    });

    // Save the PDF with a specific name
    doc.save('deleted_customer_list.pdf');
  };

  return (
    <div className="customer-list-table-container">
      <h1>Removed Customer List</h1>
      <input
        type="text"
        placeholder="Search by NIC"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
        maxLength={13}
      />
      <table className="customer-list-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>LandOwner Name</th>
            <th>District Code</th>
            <th>Division Code</th>
            <th>Block No</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeletedCustomers.length === 0 ? (
            <tr>
              <td colSpan="11">No records found</td>
            </tr>
          ) : (
            filteredDeletedCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.fname}</td>
                <td>{customer.lname}</td>
                <td>{customer.nic}</td>
                <td>{customer.username}</td>
                <td>{customer.phone}</td>
                <td>
                  {customer.no}, {customer.street}, {customer.city}
                </td>
                <td>{customer.landOwnerName}</td>
                <td>{customer.districtCode}</td>
                <td>{customer.devisionCode}</td>
                <td>{customer.blockNo}</td>
                <td>{customer.feildSize}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button className="download-button" onClick={downloadDeletedCustomerList}>
        Download List from Here
      </button>
    </div>
  );
}

export default DeletedCustomerList;
