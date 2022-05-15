import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  var imageName = require("../static/images/slider-bg.jpg");

  const username = localStorage.getItem("user");

  const history = useHistory();

  const onHandleLogOut = () =>{
    props.onLogOut();
    history.push("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top ">
        <div className="container-fluid">
        {props.isLogin && (
          <div
          className="collapse navbar-collapse d-flex"
          style={{ marginLeft: 110 }}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link h5" to="/" exact>
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link h5" to="/product/4" exact>
                Sản phẩm
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link h5" to="/cart" exact>
                Giỏ hàng
                <i
                  className="fa fa-shopping-cart"
                  style={{ color: "black" }}
                />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link h5" to="/orders" exact>
                Đơn hàng
              </NavLink>
            </li>
          </ul>
        </div>
        )}
        {!props.isLogin && (
          <div
          className="collapse navbar-collapse d-flex"
          style={{ marginLeft: 110 }}
          id="navbarResponsive"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link h5" to="/" exact>
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link h5" to="/product/4" exact>
                Sản phẩm
              </NavLink>
            </li>
          </ul>
        </div>
        )}
          {!props.isLogin && (
            <div className="pl-5" style={{ marginRight: 120 }}>
              <NavLink to="/register" exact className="btn btn-secondary">
                Đăng ký
              </NavLink>
              <NavLink to="/login" exact className="btn btn-primary">
                Đăng nhập
              </NavLink>
            </div>
          )}

          {props.isLogin && (
            <div className="navbar pl-5" style={{ marginRight: 120 }}>
              <button  className="btn btn-dark text-white disabled" role="alert">
              Welcome  {username}
              </button>
              <button onClick={() => onHandleLogOut()} exact className="btn btn-danger">
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </nav>
      <div
        id="slides"
        className="carousel slide  mb-5 mt-5"
        data-ride="carousel"
      >
        <ul className="carousel-indicators">
          <li data-target="#slides" data-slide-to={0} className="active" />
        </ul>
        <div className="carousel-inner text-center">
          <div className="carousel-item active">
            <img src={imageName} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
