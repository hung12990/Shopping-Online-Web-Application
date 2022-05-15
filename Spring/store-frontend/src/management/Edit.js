import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { update, findOne } from "../api/ProductApi";
import { toast } from "react-toastify";

const Edit = (props) => {
  const { id } = useParams();


  useEffect(() => {
    findOne(id).then((response) => {
      const res = {
        ...response.data,
        category: response.data.category.id,
      };
      reset(res);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    const result = {
      ...data,
      category: {
        id: data.category,
      },
      image: "1.jpg",
    };
    try {
      await update(id, result);
      history.push("/admin/product");
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleLogOut = () => {
    props.onLogOut();
    history.push("/");
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
        <p className="navbar-brand col-md-3 col-lg-2 me-0 px-2" href="#">
          Dashboard
        </p>
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
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse  border border-left-5"
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
            <div className="row d-flex justify-content-between">
              <div className="col-5 align-items-center pt-3 pb-2 mb-3 d-inline-block">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group mb-3">
                    <label className="fw-bolder h5">Tên sản phẩm</label>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      className="form-control"
                    />
                    {errors.name && <span>Name is required</span>}
                  </div>
                  <div className="form-group  mb-3">
                    <label className="fw-bolder h5">Giá</label>
                    <input
                      type="number"
                      {...register("price", { required: true })}
                      className="form-control"
                    />
                    {errors.price && <span>Price is required</span>}
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-bolder h5">Loại sản phẩm</label>
                    <select
                      className="form-control"
                      {...register("category", { required: true })}
                    >
                      <option value="4">Đồng hồ nam</option>
                      <option value="1">Đồng hồ nữ</option>
                      <option value="2">Đồng hồ trẻ em</option>
                      <option value="3">Đồng hồ thông minh</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </form>
              </div>
              <div className="col-5 d-sm-inline-block float-right">
                <img src={require(`../static/images/1.jpg`)} style={{width: 200, height: 200}} className="rounded" alt="..." />
                <div className="input-group mb-3 mt-5">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Edit;
