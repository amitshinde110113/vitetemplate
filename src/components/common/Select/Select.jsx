import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Select.css';

export const Select = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  required = false,
  error,
  tooltipText
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select-container" ref={containerRef}>
      <div className="custom-select-label-wrapper">
        <label className="custom-select-label">
          {label} {required && <span className="custom-select-required">*</span>}
        </label>
        {tooltipText && (
          <div className="custom-select-tooltip-icon" title={tooltipText}>
            <Info size={14} className="text-primary-bold" />
          </div>
        )}
      </div>

      <div 
        className={`custom-select-trigger ${error ? 'has-error' : ''} ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className={`custom-select-value ${!selectedOption ? 'is-placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="custom-select-chevron">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="custom-select-dropdown shadow-lg"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`custom-select-option ${option.value === value ? 'is-selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="custom-select-error">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
