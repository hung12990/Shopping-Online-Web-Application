import "./App.css";
import Header from "./components/Header";
import "./static/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Section from "./components/Section";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Order from "./components/Order";
import Product from "./components/Product";
import { React, useState, useEffect } from "react";
import Checkout from "./components/Checkout";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import { count } from "./api/ProductApi";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./management/Dashboard";
import Account from "./management/Account";
import Pro from "./management/Pro";
import Ord from "./management/Ord";
import Form from "./management/Form";
import Edit from "./management/Edit";
import Statistical from "./management/Statistical";
import Detail from "./components/Detail";
toast.configure();

function App() {
  const [isLogin, setIsLogIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const [cart, setCart] = useState([]);

  const [total, setTotal] = useState({});

  useEffect(() => {
    count().then((res) => setTotal(res.data));
    const user = localStorage.getItem("user");

    const accessToken = localStorage.getItem("accessToken");

    if (user && accessToken) {
      setIsLogIn(true);
    }
    if (user && accessToken) {
      setIsAdmin(true);
    }
  }, []);

  const onChangeLogin = (data) => {
    setIsLogIn(data);
  };

  const onChangeAdmin = (data) => {
    setIsAdmin(data);
  };

  const onAddCart = (product) => {
    const res = cart.find((item) => item.id === product.id);
    if (res) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...res, quantity: res.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  const onRemoveCart = (product) => {
    const res = cart.filter((item) => item.id !== product.id);
    setCart(res);
  };

  const onSubCart = (product) => {
    const res = cart.find((item) => item.id === product.id);
    if (res.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...res, quantity: res.quantity - 1 } : item
        )
      );
    }
  };

  const onClearCart = () => {
    setCart([]);
  };

  const onLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAdmin");
    setIsLogIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <Router>
        {isAdmin !== 'true' && <Header isLogin={isLogin} onLogOut={onLogOut}></Header>}
        <Switch>
          <Route path="/" exact>
            <Section onAddCart={onAddCart} isLogin={isLogin}></Section>
          </Route>
          <Route path="/product/detail/:id" exact>
            <Detail onAddCart={onAddCart} isLogin={isLogin}></Detail>
          </Route>
          <Route path="/product/:id" exact>
            <Product
              onAddCart={onAddCart}
              total={total}
              isLogin={isLogin}
            ></Product>
          </Route>
          <Route path="/cart" exact>
            <Cart
              cart={cart}
              onRemoveCart={onRemoveCart}
              onAddCart={onAddCart}
              onSubCart={onSubCart}
            ></Cart>
          </Route>
          <Route path="/checkout" exact>
            <Checkout cart={cart} onClearCart={onClearCart}></Checkout>
          </Route>
          <Route path="/orders" exact>
            <Order></Order>
          </Route>
          <Route path="/login" exact>
            <Login
              onChangeLogin={onChangeLogin}
              isLogin={isLogin}
              isAdmin={isAdmin}
              onChangeAdmin={onChangeAdmin}
            ></Login>
          </Route>
          <Route path="/register" exact>
            <Register></Register>
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard onLogOut={onLogOut}></Dashboard>
          </Route>
          <Route path="/admin/account" exact>
            <Account onLogOut={onLogOut}></Account>
          </Route>
          <Route path="/admin/product" exact>
            <Pro onLogOut={onLogOut}></Pro>
          </Route>
          <Route path="/admin/order" exact>
            <Ord onLogOut={onLogOut}></Ord>
          </Route>
          <Route path="/admin/add-product" exact>
            <Form onLogOut={onLogOut}></Form>
          </Route>
          <Route path="/admin/edit-product/:id" exact>
            <Edit onLogOut={onLogOut}></Edit>
          </Route>
          <Route path="/best" exact>
          <Statistical onLogOut={onLogOut}></Statistical>
        </Route>
        </Switch>
        <ToastContainer></ToastContainer>
        {isAdmin !== 'true' && <Footer></Footer>}
      </Router>
    </div>
  );
}

export default App;
