
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  };
  
  
  const addUserData = (newUser) => {

    const userWithId = { ...newUser, id: generateUniqueId() };
    setUserData((prevData) => [...prevData, userWithId]);
  };
  

  const handleDelete = (selectedUserData) => {
    
    console.log(selectedUserData)
    const updatedUserData = userData.filter((user) => user.id !== selectedUserData.id);
    console.log(updatedUserData)
    setUserData(updatedUserData);
  };

  const handleSort = (category) => {
    
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[category].localeCompare(b[category]);
      } else {
        return b[category].localeCompare(a[category]);
      }
    });

    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setUserData(sortedData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TableComponent userData={userData}  handleDelete={handleDelete} handleSort={handleSort} />}
        />
        <Route path="/form" element={<FormComponent addUserData={addUserData} handleDelete={handleDelete}/>} />
      </Routes>
    </Router>
  );
};

export default App;
