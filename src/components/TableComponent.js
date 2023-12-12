import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';



const TableComponent = ({ userData,  handleDelete, handleSort }) => {
    
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [searchedUser, setSearchedUser] = useState(null);
    const [ageGroup1to18, setAgeGroup1to18] = useState([]);
    const [ageGroup19to30, setAgeGroup19to30] = useState([]);
    const [ageGroup31to45, setAgeGroup31to45] = useState([]);
    const [ageGroup45plus, setAgeGroup45plus] = useState([]);
  
    useEffect(() => {
      
      const ageGroup1to18 = [];
      const ageGroup19to30 = [];
      const ageGroup31to45 = [];
      const ageGroup45plus = [];
  
      
      userData.forEach((person) => {
        
        if (person.age >= 1 && person.age <= 18) {
          
          ageGroup1to18.push(person);
        } else if (person.age >= 19 && person.age <= 30) {
          
          ageGroup19to30.push(person);
        } else if (person.age >= 31 && person.age <= 45) {
          
          ageGroup31to45.push(person);
        } else {
          
          ageGroup45plus.push(person);
        }
      });
  
      
      setAgeGroup1to18(ageGroup1to18);
      setAgeGroup19to30(ageGroup19to30);
      setAgeGroup31to45(ageGroup31to45);
      setAgeGroup45plus(ageGroup45plus);
  
      
    }, [userData]);
  
    
    const handleEdit = (selectedUserData) => {
        
        navigate('/form', { state: { selectedUserData } });
      };
  

      const handleSearch = () => {
        const result = userData.find((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        if (result) {
          setSearchedUser(result); 
          setSearchMessage(''); 
        } else {
          setSearchedUser(null); 
          setSearchMessage('User not found. Please add.'); 
        }
      };

  

  const handleAdd = () => {
    
    navigate('/form');
  };

  return (
    
    <div className="container mt-5">
      
      <div className="row mb-3">
        <div className='col-1'></div>
        <div className="col-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className='col-5'></div>
        <div className="col-2 d-flex justify-content-end">
        <button type='button' className="btn btn-secondary mx-4" onClick={() => handleSort('name')}>
                Sort
        </button>
        <button type="button" className="btn btn-success mx-4" onClick={handleAdd}>
            Add
        </button>
        </div>
        
      </div>

      {searchMessage && <p className="alert alert-warning">{searchMessage}</p>}

      <table className="table table-bordered">
        <thead className="table-light text-center">
          <tr>
            <th >
              1-18 Age Group
              
            </th>
            <th >
              19-30 Age Group
              
            </th>
            <th >
              31-45 Age Group
              
            </th>
            <th >
              45+ Age Group
              
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className="table table-bordered">
                <thead className="table-light text-center">
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ageGroup1to18.map((user) => (
                    <tr key={user.id}
                    className={searchedUser && searchedUser.id === user.id ? 'table-info' : ''}
                    >
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>
                        <span
                            className="text-primary mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(user)}
                            >
                            <EditOutlined />
                        </span>
                        <span
                            className="text-danger mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(user)}
                            >
                            <DeleteOutlined />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td>
              <table className="table table-bordered">
                <thead className="table-light text-center">
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ageGroup19to30.map((user) => (
                    <tr key={user.id}
                    className={searchedUser && searchedUser.id === user.id ? 'table-info' : ''}
                    >
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>
                      <span
                            className="text-primary mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(user)}
                            >
                            <EditOutlined />
                        </span>
                        <span
                            className="text-danger mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(user)}
                            >
                            <DeleteOutlined />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td>
              <table className="table table-bordered">
                <thead className="table-light text-center">
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ageGroup31to45.map((user) => (
                    <tr key={user.id}
                    className={searchedUser && searchedUser.id === user.id ? 'table-info' : ''}
                    >
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>
                      <span
                            className="text-primary mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(user)}
                            >
                            <EditOutlined />
                        </span>
                        <span
                            className="text-danger mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(user)}
                            >
                            <DeleteOutlined />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>

            <td>
              <table className="table table-bordered">
                <thead className="table-light text-center">
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ageGroup45plus.map((user) => (
                    <tr key={user.id}
                    className={searchedUser && searchedUser.id === user.id ? 'table-info' : ''}
                    >
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>
                      <span
                            className="text-primary mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(user)}
                            >
                            <EditOutlined />
                        </span>
                        <span
                            className="text-danger mx-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDelete(user)}
                            >
                            <DeleteOutlined />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

export default TableComponent;
