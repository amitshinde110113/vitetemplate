import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaConfig } from './config/oktaConfig';
import { IngestionDashboard } from './pages/Ingestion/IngestionDashboard';
import { DemoPage } from './pages/Demo/DemoPage';

const oktaAuth = new OktaAuth(oktaConfig);

// A simple mock login page since Okta requires /login for `onAuthRequired` custom handler
const Login = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      <h1>Authentication Required</h1>
      <button 
        style={{ padding: '0.75rem 1.5rem', backgroundColor: '#055AA9', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        onClick={() => oktaAuth.signInWithRedirect()}
      >
        Sign in with Okta
      </button>
    </div>
  );
};

import { MainLayout } from './components/layout/MainLayout';

const AppRoutes = () => {
  const navigate = useNavigate();

  const customAuthHandler = () => {
    navigate('/login');
  };

  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security 
      oktaAuth={oktaAuth} 
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Routes>
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <MainLayout>
              <Routes>
                <Route path="/demo" element={<DemoPage />} />
                <Route path="/" element={<IngestionDashboard />} />
              </Routes>
            </MainLayout>
          } 
        />
      </Routes>
    </Security>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
