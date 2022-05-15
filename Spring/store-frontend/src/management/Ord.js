import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getAll, update } from "../api/OrderApi";
import { toast } from "react-toastify";
const Ord = (props) => {
  const history = useHistory();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAll().then((result) => setOrders(result.data));
  }, []);

  const onHandleLogOut = () => {
    props.onLogOut();
    history.push("/");
  };

  const onUpdate = async(id, status) =>{
    try {
      await update(id, status);
      toast.success("Cập nhật thành công.");
    } catch (error) {
      toast.error(error.response.data);
    }
  }

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
              <h3 className="text-danger">Đơn hàng</h3>
            </div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <table className="table border">
                <thead>
                  <tr>
                    <th scope="col">Mã ĐH</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">CHO DUYET</th>
                    <th scope="col">THANH CONG</th>
                    <th scope="col">DA HUY</th>
                  </tr>
                </thead>
                <tbody>
                  {orders &&
                    orders.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td>{item.amount} USD</td>
                        <td>{item.address}</td>
                        <td>
                          {item.status === "CHO DUYET" ? (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={index}
                                onClick={() => onUpdate(item.id, 'CHO DUYET')}
                                defaultChecked
                              />
                            </div>
                          ) : (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={index}
                                onClick={() => onUpdate(item.id, 'CHO DUYET')}
                              />
                            </div>
                          )}
                        </td>
                        <td>
                          {item.status === "THANH CONG" ? (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={index}
                                onClick={() => onUpdate(item.id, 'THANH CONG')}
                                defaultChecked
                              />
                            </div>
                          ) : (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={index}
                                onClick={() => onUpdate(item.id, 'THANH CONG')}
                              />
                            </div>
                          )}
                        </td>
                        <td>
                          {item.status === "DA HUY" ? (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name={index}
                                onClick={() => onUpdate(item.id, 'DA HUY')}
                                defaultChecked
                              />
                            </div>
                          ) : (
                            <div className="form-check">
                              <input
                                className="form-check-input"  
                                type="radio"
                                name={index}
                                onClick={() => onUpdate(item.id, 'DA HUY')}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <nav aria-label="..." className="d-sm-inline-block">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <NavLink to="/" className="page-link">
                      Previous
                    </NavLink>
                  </li>
                  <li className="page-item">
                    <NavLink className="page-link" to="/admin/order">
                      1
                    </NavLink>
                  </li>
                  <li className="page-item disabled">
                    <NavLink to="/" className="page-link">
                      Next
                    </NavLink>
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

export default Ord;
