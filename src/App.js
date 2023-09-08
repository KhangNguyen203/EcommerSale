import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import './base.css';
import './style.css';
import Login from './component/Login';
import Home from './component/Home';
import { createContext, useReducer } from 'react';
import cookie from "react-cookies";
import Register from './component/Register';
import Store from './component/Store';
import { CreateStore } from './component/Store/CreateStore';
import 'moment/locale/vi';
import ProductDetails from './component/ProductDetails';
import Cart from './component/Cart';
import { Container } from 'react-bootstrap';
import MyCartCounterReducer from './reducers/MyCartCounterReducer';
import MyUserReducer from "./reducers/MyUserReducer";

export const MyUserContext = createContext();
export const MyCartContext = createContext();


function App() {

  const countCart = () => {
    let cart = cookie.load("cart") || null;
    if (cart !== null)
      return Object.values(cart).reduce((init, current) => init + current["quantity"], 0);
    return 0;
  }

  const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null)
  const [cartCounter, cartDispatcher] = useReducer(MyCartCounterReducer, countCart());

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <MyCartContext.Provider value={[cartCounter, cartDispatcher]}>
        <BrowserRouter>
          <Header />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/store/:storeId" element={<Store />} />
              <Route path="/create-store" element={<CreateStore />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </MyCartContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;