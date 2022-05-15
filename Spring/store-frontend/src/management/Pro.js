import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { findAll, remove } from "../api/ProductApi";
import { toast } from "react-toastify";
const Pro = (props) => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const onChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    findAll(page).then((result) => setProducts(result.data));
  }, [page]);

  const history = useHistory();

  const onHandleLogOut = () => {
    props.onLogOut();
    history.push("/");
  };

  const removeProduct = (id, page) => {
    remove(id).then((response) => toast.success(response.data));
    history.push("/admin/product");
    setPage(page);
  };

  return (
    <div>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <title>Admin Dashboard</title>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-1 shadow">
        <NavLink
          className="navbar-brand col-md-3 col-lg-2 me-0 px-2"
          to="/dashboard"
        >
          Dashboard
        </NavLink>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <button
              onClick={() => onHandleLogOut()}
              className="nav-link px-3 text-dark"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span className="fw-bolder h3">Quản lý</span>
                  </h6>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/account">
                    <span data-feather="file" />
                    Tài khoản
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/product">
                    <span data-feather="shopping-cart" />
                    Sản phẩm
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/order">
                    <span data-feather="users" />
                    Đơn hàng
                  </NavLink>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span className="fw-bolder h3">Thống kê</span>
                <NavLink
                  className="link-secondary"
                  to=""
                  aria-label="Add a new report"
                >
                  <span data-feather="plus-circle" />
                </NavLink>
              </h6>
              <ul className="nav flex-column mb-2">        
                <li className="nav-item">
                  <NavLink className="nav-link" to="/best">
                    <span data-feather="file-text" />
                    Sản phẩm bán chạy
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5">
            <div className="align-items-top">
              <h3 className="text-danger">Sản phẩm</h3>
            </div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <table className="table border">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Tên SP</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Loại sản phẩm</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.price} USD</td>
                        <td>{item.category.name}</td>
                        <td>{item.available ? "Còn hàng" : "Hết hàng"}</td>
                        <td className="h5">
                          <NavLink to={`/admin/edit-product/${item.id}`}>
                            <i className="fa fa-edit fw-bolder text-primary " />
                          </NavLink>
                          <button
                            className="border-white"
                            onClick={() => removeProduct(item.id, page)}
                          >
                            <i className="fa fa-trash-o fw-bolder text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <NavLink
                  to="/admin/add-product"
                  exact
                  type="button"
                  className="btn btn-primary d-inline-block"
                >
                  Thêm mới
                </NavLink>
              </div>
              <nav aria-label="..." className="d-sm-inline-block">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      onClick={() => onChangePage(1)}
                      className="page-link"
                    >
                      First
                    </button>
                  </li>
                  <li className={page === 1 ? "page-item active" : "page-item"}>
                    <button
                      onClick={() => onChangePage(1)}
                      className="page-link"
                    >
                      1
                    </button>
                  </li>
                  <li className={page === 2 ? "page-item active" : "page-item"}>
                    <button
                      onClick={() => onChangePage(2)}
                      className="page-link"
                    >
                      2
                    </button>
                  </li>
                  <li className={page === 3 ? "page-item active" : "page-item"}>
                    <button
                      onClick={() => onChangePage(3)}
                      className="page-link"
                    >
                      3
                    </button>
                  </li>
                  <li className={page === 4 ? "page-item active" : "page-item"}>
                    <button
                      onClick={() => onChangePage(4)}
                      className="page-link"
                    >
                      4
                    </button>
                  </li>
                  <li className={page === 5 ? "page-item active" : "page-item"}>
                    <button
                      onClick={() => onChangePage(5)}
                      className="page-link"
                    >
                      5
                    </button>
                  </li>
                  <li className={page === 6 ? "page-item active" : "page-item"}>
                    <button
                      onClick={() => onChangePage(6)}
                      className="page-link"
                    >
                      6
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      onClick={() => onChangePage(6)}
                      className="page-link"
                    >
                      Last
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Pro;
