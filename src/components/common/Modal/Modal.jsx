import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../Button/Button';
import './Modal.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColorTheme = 'primary'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="custom-modal-overlay backdrop-blur-sm" 
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
            className="custom-modal-content shadow-xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="custom-modal-header">
              <h3>{title}</h3>
              <button className="custom-modal-close transition-colors duration-150 hover:bg-neutral-light hover:text-black" onClick={onClose} aria-label="Close modal">
                &times;
              </button>
            </div>
            <div className="custom-modal-body">
              {children}
            </div>
            <div className="custom-modal-footer">
              <Button variant="outline" colorTheme="neutral" onClick={onClose}>
                {cancelText}
              </Button>
              {onConfirm && (
                <Button variant="solid" colorTheme={confirmColorTheme} onClick={onConfirm}>
                  {confirmText}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
