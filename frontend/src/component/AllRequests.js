import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/AllRequest.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import { parseISO, isSameDay } from 'date-fns';


function AllRequests() {
  const { nic } = useParams();
  const [mergedData, setMergedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');
  const [highlightedRows, setHighlightedRows] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');

  useEffect(() => {
    // Fetch data from both tables and merge them
    axios
      .get(`http://localhost:8070/customer/checkNIC/${nic}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setMergedData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
        setLoading(false);
      });
  }, [nic]);

  



  const filterRequestsByDate = () => {
    const matchingRows = mergedData.filter((data) => {
      if (!data.requestedDate) {
        // Handle the case where requestedDate is undefined
        return false;
      }
  
      const searchDateObj = new Date(searchDate);
      const requestedDateParts = data.requestedDate.split('/'); // Replace '/' with your date separator
  
      if (requestedDateParts.length !== 3) {
        // Handle invalid date format, e.g., if it doesn't split into three parts
        return false;
      }
  
      const requestedDateObj = new Date(
        Number(requestedDateParts[2]), // Year
        Number(requestedDateParts[1]) - 1, // Month (subtract 1 since months are 0-indexed)
        Number(requestedDateParts[0]) // Day
      );
  
      // Debug log to check dates
      console.log('Search Date:', searchDateObj);
      console.log('Requested Date:', requestedDateObj);
  
      return (
        searchDateObj.getDate() === requestedDateObj.getDate() &&
        searchDateObj.getMonth() === requestedDateObj.getMonth() &&
        searchDateObj.getFullYear() === requestedDateObj.getFullYear()
      );
    });
  
    // Debug log to check matching rows
    console.log('Matching Rows:', matchingRows);
  
    if (matchingRows.length === 0) {
      setHighlightedRows([]);
      setNoResultsMessage('No results');
    } else {
      setHighlightedRows(matchingRows);
      setNoResultsMessage('');
    }
  };
  

  



  
  const downloadRequestFormAsPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
      // Define the text to be centered
  const text = 'MY REQUESTS';

  // Calculate the width of the text
  const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;

  // Calculate the X-coordinate to center the text
  const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;

  // Add the centered text to the PDF
  doc.text(text, centerX, 10);

  
    // Define the table headers
    const headers = [['Request ID', /*'NIC',*/ 'Item Name', 'Req Date', 'Quantity', 'Price', 'Status']];
  
    // Extract the data from mergedData
    const data = mergedData.map((row) => [
      row.requestId || row._id || row._id || row._id,
      //row.nic || row.NIC || row.nic || row.farmerid,
      row.productName || row.ricetype || row.type || row.seedtype,
      row.requestedDate || row.date || row.plantedDate || row.date,
      row.quantity || row.cultivatedamount || row.amount || row.reqamount,
      row.totalPrice || '-',
      row.status || row.status || row.isChecked || row.status,
    ]);
  
    // Create a table with the headers and data
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20, // Adjust the starting Y position as needed
    });
  
    // Save the PDF with a specific name
    doc.save('request_form.pdf');
  };
  

  const downloadRowDataAsPDF = (rowData) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add row data to the PDF
    doc.text('Row Data:', 10, 10);
    Object.keys(rowData).forEach((key, index) => {
      const yPos = 20 + index * 10;
      doc.text(`${key}: ${rowData[key]}`, 10, yPos);
    });

    // Save the PDF with a specific name
    doc.save('row_data.pdf');
  };




  return (
    <div>
      <h2 className="all-requests-heading">MY REQUESTS</h2>
      <div className="search-container">
        <p className="searchPara">Search by date</p>
        <div className="search-bar2">    {/*if you want you can get the removed search bar's container from here by removing 2*/}
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Search by Date"
            className="reqSearchBar"
          />
          <button onClick={filterRequestsByDate} className="reqSearchButton">
            Search
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : null}
        {noResultsMessage && !loading && (
          <p className="no-results-message">{noResultsMessage}</p>
        )}
      </div>
      {Array.isArray(mergedData) && mergedData.length > 0 ? (
        <table className="all-requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              {/*<th>NIC</th>*/}
              <th>Item Name</th>
              <th>Req Date</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.map((data, index) => (
              <tr key={index} className={highlightedRows.includes(data) ? 'highlight' : ''}>
                <td>{data.requestId || data._id || data._id || data._id}</td>
                {/*<td>{data.nic || data.NIC || data.nic || data.farmerid}</td>*/}
                <td>{data.productName || data.ricetype || data.type || data.seedtype}</td>
                <td>{data.requestedDate || data.date || data.plantedDate || data.date}</td>
                <td>{data.quantity || data.cultivatedamount || data.amount || data.reqamount}</td>
                <td>{data.totalPrice || '-'}</td>
                <td>{data.status || data.status || data.isChecked || data.status || '-'}</td>
                <td>
                  <button onClick={() => downloadRowDataAsPDF(data)} className="download-row-button">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="noreq">You have not made any request yet</p>
      )}

<button onClick={downloadRequestFormAsPDF} className="download-button">
        Download Requests PDF
      </button>
    </div>
  );
}

export default AllRequests;