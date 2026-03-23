import React from 'react';
import './Header.css';
import { User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-container">
          <span className="logo-text">REGENERON</span>
          <span className="logo-subtext">SCIENCE TO MEDICINE<sup>®</sup></span>
        </div>
        <div className="header-divider"></div>
        <div className="header-title-container">
          <h1 className="header-title">Enterprise Self Service Ingestion</h1>
          <p className="header-subtitle">Regeneron Approved Production Platform</p>
        </div>
      </div>
      <div className="header-right">
        <div className="user-profile">
          <User size={24} />
        </div>
      </div>
    </header>
  );
};
