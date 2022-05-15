import React, { useEffect, useState } from "react";
import { findAll } from "../api/ProductApi";
import { toast } from "react-toastify";
import { NavLink, useHistory } from "react-router-dom";

const Section = (props) => {
  const [products, setProducts] = useState([]);
  
  const history = useHistory();

  useEffect(() => {
    findAll(1).then((result) => setProducts(result.data));
  }, []);

  const handleAdd = (item) => {
    if (props.isLogin) {
      props.onAddCart(item);
    } else {
      toast.error("Đăng nhập để mua sắm.");
      history.push("/login");
    }
  };

  return (
    <div>
      <div className="container-fluid padding">
        <div className="row welcome text-center text-danger mb-5 mt-5">
          <div className="col-12">
            <h1 className="display-4">Khuyến mãi hot</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid padding">
        <div className="row padding">
          {products.map((item, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div
                className="card text-center .bg-light"
                data-toggle="tooltip"
                title={item.name}
              >
                <div className="card-body">
                  <img
                    className="card-img-top mb-5"
                    src={require(`../static/images/${item.image}`)}
                    alt=""
                  />
                  <NavLink
                    to={`/product/detail/${item.id}`}
                    exact
                    style={{ textDecoration: "none" }}
                  >
                    <h4 className="card-title">{item.name}</h4>
                  </NavLink>
                  <p className="card-text">{item.price} USD</p>
                  <button
                    onClick={() => handleAdd(item)}
                    className="btn btn-outline-secondary"
                    alt=""
                  >
                    Mua hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid padding">
        <div className="row welcome text-center text-danger mb-5 mt-5">
          <div className="col-12">
            <h1 className="display-4">Sản phẩm bán chạy</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid padding">
        <div className="row padding">
          {products.map((item, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div
                className="card text-center .bg-light"
                data-toggle="tooltip"
                title={item.name}
              >
                <div className="card-body">
                  <img
                    className="card-img-top mb-5"
                    src={require(`../static/images/${item.image}`)}
                    alt=""
                  />
                  <NavLink
                    to={`/product/detail/${item.id}`}
                    exact
                    style={{ textDecoration: "none" }}
                  >
                    <h4 className="card-title">{item.name}</h4>
                  </NavLink>
                  <p className="card-text">{item.price} USD</p>
                  <button
                    onClick={() => handleAdd(item)}
                    className="btn btn-outline-secondary"
                    alt=""
                  >
                    Mua hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
