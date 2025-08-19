"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import './MultiDropdown.scss';

interface MultiDropdownProps {
  options: {label: string, value: string}[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
}

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.value || '');
  const [options, setOptions] = useState<{label: string, value: string}[]>(props.options || []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        const found = options.find(option => option.label.toLowerCase() === value.toLowerCase());
        if (!found) {
            setOptions([...options, {label: value, value: value}]);
            
        }
    }
  }
  const handleAddOption = (value: string) => {
    console.log("handleAddOption", value)
    setOptions([...options, {label: value, value: value}]);
    setValue(value);
  }

  const handleClick = () => {
    if (!isOpen) 
        toggleDropdown();
  }

  const handleOptionClick = (option: string) => {
    setValue(option);
    toggleDropdown();
  }

  const findInOptions = (value: string) => {
    return options.filter((option) => option.label.toLowerCase().search(value.toLowerCase()) > -1);
  }
  const findExactMatch = (value: string) => {
    return options.find((option) => option.label.toLowerCase() === value.toLowerCase() || option.value.toLowerCase() === value.toLowerCase());
  }

  // ---------- dropdown outside click ------------
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => setIsOpen(false));

  return (
    <div className="multi-dropdown">
        <input 
        type="text" 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        value={value} 
        onClick={handleClick} 
        className={`${isOpen ? 'open' : ''}`}
        placeholder={props.placeholder || 'Select an option'}
        />
        {isOpen && (
            <div className="multi-dropdown-options" ref={dropdownRef}>
                {findInOptions(value).map((option) => 
                (
                    <div key={option.value} onClick={() => handleOptionClick(option.value)} className={`${value === option.value ? 'selected' : ''}`}>
                        {option.label}
                        {value === option.value &&
                        <span className="tick">✓</span>
                        }
                    </div>
                )
                )}
                {!findExactMatch(value) && value.length > 0 && (
                  <div className="add-option" onClick={() => handleAddOption(value)}>
                    <span>Add "{value}" to the list</span>
                    <button>Add</button>
                  </div>
                )}
            </div>
        )}
    </div>
  );
};

export default MultiDropdown;

