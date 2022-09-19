import React from 'react';

export default function Dropdown({label, options}) {
  return (
      <label> {label}
        <select type="text">
          {
            options.map((option, index) => {
              return <option key={index} value={option}>{option}</option>
            })
          }
        </select>
      </label>
  );
}