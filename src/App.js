import './App.css';
import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import AdminList from './admin/AdminList';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./login/Login";
import AdminDetail from './admin/AdminDetail';

function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route index element={ <RequireAuth><Home /></RequireAuth> } />
          <Route path="admin" element={ <RequireAuth><AdminList/></RequireAuth> } />
          <Route path="admin/detail" element={<RequireAuth><AdminDetail/></RequireAuth>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
