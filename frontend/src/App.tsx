import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import NewProduct from "./features/products/NewProduct";
import Products from "./features/products/Products";

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
          <AppToolbar />
      </header>
      <Container>
          <main>
              <Routes>
                  <Route path='/register' element={(<Register />)} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/product/new' element={(<NewProduct />)} />
                  <Route path='/' element={(<Products />)} />
              </Routes>
          </main>
      </Container>
    </>
  );
};

export default App;
