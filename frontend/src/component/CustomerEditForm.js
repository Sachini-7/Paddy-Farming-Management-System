// CustomerEditForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerEditForm() {
  const { nic } = useParams();
  const [customer, setCustomer] = useState({});
  const [editedCustomer, setEditedCustomer] = useState({});
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});
  const [editedUserDetails, setEditedUserDetails] = useState({});
  
  useEffect(() => {
    // Fetch customer details based on the NIC
    axios.get(`http://localhost:8070/customer/getUser/${nic}`)
      .then((response) => {
        setCustomer(response.data.customer);
        setEditedCustomer({ ...response.data.customer });
      })
      .catch((error) => {
        console.error('Error fetching customer details', error);
      });
  }, [nic]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
    validateField(name, value);
  };

  

  const handleUpdateCustomer = () => {
    // Check if all fields are valid
    if (allFieldsValid()) {
      // Make an API request to update the customer
      axios
        .put(`http://localhost:8070/customer/updateCus/${nic}`, editedCustomer)
        .then((response) => {
          if (response.status === 200) {
            // Customer updated successfully
            alert('Customer updated successfully');
            // You can also redirect to the customer list page here
            navigate('/customer-list');
          }
        })
        .catch((error) => {
          console.error('Error updating customer', error);
          // Handle any errors and show an alert or message to the user
          alert('Error updating customer');
        });
    } else {
      alert('Please fix validation errors before updating.');
    }
  };




  const validateField = (fieldName, value) => {
    const errors = { ...validationErrors };
  
    switch (fieldName) {
      case 'fname':
      case 'lname':
        if (!/^[A-Za-z]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters';
        } else {
          delete errors[fieldName];
        }
        break;
  
      case 'username':
        if (!/^[A-Za-z0-9]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters and numbers';
        } else {
          delete errors[fieldName];
        }
        break;
  
      case 'phone':
        if (!/^[0-9]*$/.test(value) || value.length !== 10) {
          errors[fieldName] = 'Enter a valid 10-digit phone number';
        } else {
          delete errors[fieldName];
        }
        break;
  
        case 'no':
          if (!/^\d{1,8}(\/\d{1,8})?$/.test(value)) {
            errors[fieldName] = 'Enter numbers only, optionally followed by a single "/" character';
          } else {
            delete errors[fieldName];
          }
          break;
          
        
  
      case 'street':
        if (!/^[A-Za-z0-9\s]*$/.test(value) || value.length > 50) {
          errors[fieldName] = 'Enter only letters, numbers, and spaces, up to 50 characters';
        } else {
          delete errors[fieldName];
        }
        break;
          
  
      case 'city':
        if (!/^[A-Za-z0-9\s]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters, numbers, and spaces';
        } else {
          delete errors[fieldName];
        }
        break;
  
      // Add validation cases for other fields as needed
  
      default:
        break;
    }
  
    setValidationErrors(errors);
  };
  

  const allFieldsValid = () => {
    for (const fieldName in validationErrors) {
      if (validationErrors.hasOwnProperty(fieldName)) {
        if (validationErrors[fieldName]) {
          return false;
        }
      }
    }
    return true;
  };





  return (
    <div className="profile-container">
    <h2>Edit Profile</h2>
    <div className="profile-info">
    <table>
      <tbody>
        <tr>
          <td>First Name</td>
          <td>
            <input
              type="text"
              name="fname"
              value={editedCustomer.fname || ''}
              onChange={handleInputChange}
            />
            {validationErrors.fname && (
              <div className="error-message">{validationErrors.fname}</div>
            )}
          </td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>
            <input
              type="text"
              name="lname"
              value={editedCustomer.lname || ''}
              onChange={handleInputChange}
            />
            {validationErrors.lname && (
              <div className="error-message">{validationErrors.lname}</div>
            )}
          </td>
          </tr>
          <tr>
            <td>NIC</td>
            <td>
              <input
                type="text"
                name="nic"
                disabled
                value={editedCustomer.nic || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
      
          <tr>
          <td>Username</td>
          <td>
            <input
              type="text"
              name="username"
              disabled
              value={editedCustomer.username || ''}
              onChange={handleInputChange}
            />
            {validationErrors.username && (
              <div className="error-message">{validationErrors.username}</div>
            )}
          </td>
          </tr>

          <tr>
          <td>Phone</td>
          <td>
            <input
              type="text"
              name="phone"
              value={editedCustomer.phone || ''}
              onChange={handleInputChange}
            />
            {validationErrors.phone && (
              <div className="error-message">{validationErrors.phone}</div>
            )}
          </td>
          </tr>
         <tr>
          <td>No</td>
          <td>
            <input
              type="text"
              name="no"
              value={editedCustomer.no || ''}
              onChange={handleInputChange}
            />
            {validationErrors.no && (
              <div className="error-message">{validationErrors.no}</div>
            )}
          </td>
        </tr>
        <tr>
          <td>Street</td>
          <td>
            <input
              type="text"
              name="street"
              value={editedCustomer.street || ''}
              onChange={handleInputChange}
            />
            {validationErrors.street && (
              <div className="error-message">{validationErrors.street}</div>
            )}
          </td>
        </tr>
        <tr>
          <td>City/Locality</td>
          <td>
            <input
              type="text"
              name="city"
              value={editedCustomer.city || ''}
              onChange={handleInputChange}
            />
            {validationErrors.city && (
              <div className="error-message">{validationErrors.city}</div>
            )}
          </td>
        </tr>
        {/* Add more rows for other fields */}
      </tbody>
    </table>
      
    <button type="button" onClick={handleUpdateCustomer}>Update</button>

    </div>
  </div>
  );
}
  {/*return (
    <div>
      <h1>Edit Customer</h1>
      <form>
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={editedCustomer.fname || ''}
          onChange={handleInputChange}
        />
        {/* Add similar input fields for other customer details */}
        {/*<button type="button" onClick={handleUpdateCustomer}>Update</button>
      </form>
    </div>
  );
}*/}

export default CustomerEditForm;
