import React from 'react';
import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import NewProduct from "./features/products/NewProduct";

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
          <AppToolbar />
      </header>
      <main>
        <Routes>
            <Route path='/register' element={(<Register />)} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/new' element={(<NewProduct />)} />
        </Routes>
      </main>
    </>
  );
};

export default App;
