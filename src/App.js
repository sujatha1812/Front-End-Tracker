import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom';
import Login from './components/login'
import NavBar from './components/navBar';
import Users from './components/users';
import UserProfiles from './components/userprofile';
import GetStudentDetail from './components/get-student-detail';
import PrivateRoute from './services/privateRoute';
import GetStudentData from './components/get-student-data';
import Home from './components/home';
import Createattendance from './components/createattendance';
import Checkout from './components/checkout';
import FAQ from './components/faq';
import CheckIn from './components/scanner';

function App() {
  const [loading, setloading] = useState(false)
  useEffect(() => {
    const interval = (setTimeout(() => setloading(true), 1000)
    )
    return () => clearInterval(interval)
  })
  return (
    <>
      <BrowserRouter>
        <NavBar />
        {loading &&
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route
              path="create-attendance"
              element={
                <PrivateRoute>
                  {" "}
                  <Createattendance />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="checkout"
              element={
                <PrivateRoute>
                  {" "}
                  <Checkout />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="all-students"
              element={
                <PrivateRoute>
                  {" "}
                  <Users />{" "}
                </PrivateRoute>
              }
            />

            <Route
              path="user-profile"
              element={
                <PrivateRoute>
                  {" "}
                  <UserProfiles />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="faq"
              element={
                <PrivateRoute>
                  {" "}
                  <FAQ />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="get-student-detail/:id"
              element={
                <PrivateRoute>
                  {" "}
                  <GetStudentDetail />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="check-in"
              element={
                <PrivateRoute>
                  {" "}
                  <CheckIn />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="get-student-data"
              element={
                <PrivateRoute>
                  {" "}
                  <GetStudentData />{" "}
                </PrivateRoute>
              }
            />


          </Routes>
        }
      </BrowserRouter>


    </>
  );
}

export default App;
