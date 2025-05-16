import React, { useState } from 'react';
import { ProgramData } from '../interfaces/ProgramData';
import './CreateProgramForm.css';

interface CreateProgramFormProps {
  onSubmit: (program: Omit<ProgramData, 'id'>) => void;
}

const CreateProgramForm: React.FC<CreateProgramFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    zip_code: '',
    organization: '',
    services: '',
    type: '',
    ages: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="create-program-form" onSubmit={handleSubmit}>
      <h2>Create New Program</h2>
      
      <div className="form-group">
        <label htmlFor="organization">Organization Name</label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="services">Services Offered</label>
        <textarea
          id="services"
          name="services"
          value={formData.services}
          onChange={handleChange}
          required
          placeholder="Describe the services and programs offered..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Program Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select a type</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
          <option value="Preschool">Preschool</option>
          <option value="Childcare">Childcare</option>
          <option value="Lifeguard">Lifeguard</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ages">Age Range</label>
        <input
          type="text"
          id="ages"
          name="ages"
          value={formData.ages}
          onChange={handleChange}
          required
          placeholder="e.g., 2mos - 17yrs"
        />
      </div>

      <div className="form-group">
        <label htmlFor="zip_code">ZIP Code</label>
        <input
          type="text"
          id="zip_code"
          name="zip_code"
          value={formData.zip_code}
          onChange={handleChange}
          pattern="[0-9]{5}"
          maxLength={5}
          required
        />
      </div>

      <button type="submit" className="submit-button">Create Program</button>
    </form>
  );
};

export default CreateProgramForm; 