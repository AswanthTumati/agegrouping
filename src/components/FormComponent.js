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

  const [fieldErrors, setFieldErrors] = useState({
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
      const { name, age, mobile, email } = location.state.selectedUserData;
      setFormData({ name, age, mobile, email });
    }
    nameInputRef.current.focus();
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const handleCancel = () => {
    setFormData({ name: '', age: '', mobile: '', email: '' });
    setFieldErrors({ name: '', age: '', mobile: '', email: '' });
  };

  const handleAdd = () => {
    const validationErrors = {};
    let isValid = true;

    
    for (const key in formData) {
      if (formData[key].trim() === '') {
        validationErrors[key] = 'This field is required';
        isValid = false;
      }
    }

    
    if (formData.email.trim() !== '' && !isValidEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    setFieldErrors(validationErrors);

    
    if (!isValid) {
      return;
      // if this statement returns false it will stop the form submision with incomplete details, 
      // then returns back to form
    }

    
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

  const isValidEmail = (email) => {
        return email.includes('@');
  };

  return (
    <div className="col-6 container mt-5">
      <h2 className="mb-4 text-center">Add User</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <div className="input-group">
            <input
              type="text"
              className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              required
              ref={nameInputRef}
              value={formData.name}
              onChange={handleChange}
            />
            <span className="input-group-text"><UserOutlined /></span>
          </div>
          {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
        </div>
        <div className='row'>
          <div className="col-4 mb-3">
            <label htmlFor="age" className="form-label">Age:</label>
            <div className="input-group">
              <input
                type="number"
                className={`form-control ${fieldErrors.age ? 'is-invalid' : ''}`}
                required
                id="age"
                name="age"
                min="1"
                max="150"
                value={formData.age}
                onChange={handleChange}
              />
              <span className="input-group-text"><CheckCircleOutlined /></span>
            </div>
            {fieldErrors.age && <div className="invalid-feedback">{fieldErrors.age}</div>}
          </div>
          <div className="col-8 mb-3">
            <label htmlFor="mobile" className="form-label">Mobile:</label>
            <div className="input-group">
              <input
                type="tel"
                pattern="[0-9]{10}"
                className={`form-control ${fieldErrors.mobile ? 'is-invalid' : ''}`}
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <span className="input-group-text"><PhoneOutlined /></span>
            </div>
            {fieldErrors.mobile && <div className="invalid-feedback">{fieldErrors.mobile}</div>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <div className="input-group">
            <input
              type="email"
              className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="input-group-text"><MailOutlined /></span>
          </div>
          {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
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
