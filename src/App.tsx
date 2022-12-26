import React from 'react';
import {ThemeProvider} from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import budgtManTheme from './theme/budgtManTheme';
import UserLoginForm from './features/Person/UserLoginForm';
import NewUserForm from './features/Person/NewUser';
import NotFound from './features/404/NotFound';
import './App.css';
import LandingPage from './features/Landing/Landing';
import DrawerLayout from './component/Layout/DrawerLayout';
import Bank from './features/Bank/Bank';




function App() {
  return (
    <React.StrictMode>
    <ThemeProvider theme={budgtManTheme}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<UserLoginForm/>} />
              <Route path="/newuser" element={<NewUserForm/>} />
              <Route path="/bank" element={<Bank/>} />
             
                
              <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
</React.StrictMode>
  );
}

export default App;
