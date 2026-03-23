import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import './Dropdown.css';

export interface DropdownItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  icon?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ items, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button 
        className="custom-dropdown-trigger transition-all duration-150 hover:bg-neutral-light hover:text-black" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {icon || <MoreVertical size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="custom-dropdown-menu origin-top-right shadow-lg"
          >
            {items.map((item, index) => (
              <button
                key={index}
                className={`custom-dropdown-item transition-colors duration-150 hover:bg-neutral-light hover:text-black ${item.danger ? 'danger hover:bg-red-50 hover:text-danger' : ''}`}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
