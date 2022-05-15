import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import man from "../static/images/w1.png";
import woman from "../static/images/w2.png";
import kid from "../static/images/w6.png";
import smart from "../static/images/w8.png";
import {getAll} from "../api/CategoryApi"
import { findByCid} from "../api/ProductApi"
import { NavLink } from "react-router-dom";

const Product = (props) => {
  const {id} = useParams();

  const [products, setProducts] = useState([]);

  const history = useHistory();

  const [page, setPage] = useState(1);

  const image = [woman, kid, smart, man];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    findByCid(id, page).then((result) => {
      setProducts(result.data);
    });
    getAll().then((response) => setCategories(response.data));
  }, [id, page]);

  const handleAdd = (item) => {
    if (props.isLogin) {
      props.onAddCart(item);
    } else {
      toast.error("Đăng nhập để mua sắm.");
      history.push("/login");
    }
  };

  const onChangePage = (page) => {
    setPage(page);
  };

  return (
    <div>
      <div className="col-10 offset-1">
        <div className="container-fluid padding">
          <div className="row welcome text-center text-danger mb-5 mt-5">
            <div className="col-12">
              <h1 className="display-4">Danh mục sản phẩm</h1>
            </div>
            {/* Horizontal Rule */}
          </div>
        </div>
        <div className="container-fluid padding">
          <div className="row text-center padding">
            {categories &&
              categories.map((item, index) => (
                <div className={id - 1 === index ? "col-xs-12 col-sm-6 col-md-3 pt-5 bg-warning" : "col-xs-12 col-sm-6 col-md-3 pt-5"}              
                key={index}>
                  <NavLink to={`/product/${item.id}`}>
                    <img src={image[index]} height={50} alt="" />
                  </NavLink>
                  <p className="text-primary bolder h4 mt-3 mb-5">{item.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="container-fluid padding mt-5">
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
                  <h4 className="card-title">{item.name}</h4>
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
      <nav aria-label="Page navigation example">
        <ul className="pagination offset-5">
          <li className="page-item">
            <button className="page-link " onClick={() => onChangePage(1)}>
              First
            </button>
          </li>
          <li className={page === 1 ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => onChangePage(1)}>
              1
            </button>
          </li>
          <li className={page === 2 ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => onChangePage(2)}>
              2
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => onChangePage(2)}
            >
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Product;
