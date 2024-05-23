import React, { useState } from 'react';

const CheckboxWithLabel = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="mr-2"
      />
      <label
        className={` ${isChecked ? 'line-through' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxWithLabel;
