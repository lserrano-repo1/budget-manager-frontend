import React from 'react';
import {ThemeProvider} from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import budgtManTheme from './theme/budgtManTheme';
import UserLoginForm from './features/Login/UserLoginForm';
import NotFound from './features/404/NotFound';
import './App.css';



function App() {
  return (
    <React.StrictMode>
    <ThemeProvider theme={budgtManTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserLoginForm/>} />
                
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
</React.StrictMode>
  );
}

export default App;
