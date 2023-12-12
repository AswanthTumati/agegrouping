import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, PhoneOutlined, MailOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';


const FormComponent = ({ addUserData, handleDelete }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    email: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const nameInputRef = useRef(null);

  useEffect(() => {
    
    if (location && location.state && location.state.selectedUserData) {
      console.log("location is there",location.state.selectedUserData)
      const { name, age, mobile, email } = location.state.selectedUserData;
      setFormData({ name, age, mobile, email });
    }
    nameInputRef.current.focus();
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({ name: '', age: '', mobile: '', email: '' });
  };

  

  const handleAdd = () => {
    
    let ageGroup;
    if (formData.age >= 1 && formData.age <= 18) {
      ageGroup = '1-18';
    } else if (formData.age >= 19 && formData.age <= 30) {
      ageGroup = '19-30';
    } else if (formData.age >= 31 && formData.age <= 45) {
      ageGroup = '31-45';
    } else {
      ageGroup = '45+';
    }
  
    
    if (location?.state?.selectedUserData) {
      handleDelete(location.state.selectedUserData);
    }
  
    
    addUserData({ ...formData, ageGroup });
  
    
    setFormData({ name: '', age: '', mobile: '', email: '' });
  
    
    navigate('/');
  };
  
  



  return (
    <div className="col-6 container mt-5">
  <h2 className="mb-4 text-center">Add User</h2>
  <form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>
      <div className="input-group">
        <input type="text" className="form-control" id="name" name="name" ref={nameInputRef} value={formData.name} onChange={handleChange} />
        <span className="input-group-text"><UserOutlined /></span>
      </div>
    </div>
    <div className='row'>
    <div className="col-4 mb-3">
      <label htmlFor="age" className="form-label">Age:</label>
      <div className="input-group">
        <input type="number" className="form-control" id="age" name="age" min="1" max="150" value={formData.age} onChange={handleChange} />
        <span className="input-group-text"><CheckCircleOutlined /></span>
      </div>
    </div>
    <div className="col-8 mb-3">
      <label htmlFor="mobile" className="form-label">Mobile:</label>
      <div className="input-group">
        <input type="tel" pattern="[0-9]{10}" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
        <span className="input-group-text"><PhoneOutlined /></span>
      </div>
    </div>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <div className="input-group">
        <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
        <span className="input-group-text"><MailOutlined /></span>
      </div>
    </div>
    
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <button type="button" className="btn btn-secondary me-md-2" onClick={handleCancel}>
        <CloseCircleOutlined /> Cancel
      </button>
      <button type="button" className="btn btn-primary" onClick={handleAdd}>
        <CheckCircleOutlined /> Add
      </button>
    </div>
  </form>
</div>
  
  );
};

export default FormComponent;
