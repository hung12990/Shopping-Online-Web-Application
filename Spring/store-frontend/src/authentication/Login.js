import React, { useState } from "react";
import { login } from "../api/AuthApi";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const Login = (props) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data = {
      ...data,
      isAdmin: data.isAdmin === "on" ? "true" : "false",
    };
    try {
      await login(data).then((response) => {
        props.onChangeAdmin(data.isAdmin);
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken)
        );
        localStorage.setItem("user", data.username);
        props.onChangeLogin(true);
        toast.success("Đăng nhập thành công.");
      });
    } catch (error) {
      props.onChangeLogin(false);
      toast.error(error.response.data);
    }
  };

  if (props.isLogin) {
    if (props.isAdmin === 'true') {
      history.push("/dashboard");
    } else {
      history.push("/");
    }
  }

  return (
    <div>
      <main className="form-signin col-4 offset-4 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h1 mb-3 fw-normal text-danger fw-bolder text-center">
            Đăng nhập
          </h1>
          <div className="form-floating mb-3">
            <input
              type="text"
              {...register("username", { required: true })}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Tài khoản</label>
            {errors.username && (
              <div id="emailHelp" className="form-text">
                Username is required
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              {...register("password", { required: true })}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Mật khẩu</label>
            {errors.password && (
              <div id="emailHelp" className="form-text">
                Password is required
              </div>
            )}
          </div>
          <div className="checkbox mb-3">
            <label>
              <input
                type="checkbox"
                {...register("isAdmin", { required: false })}
                value="on"
              />
              Đăng nhập là admin?
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Đăng nhập
          </button>
          <p className="mt-5 mb-3 text-muted text-center">© 1994-2022</p>
        </form>
      </main>
    </div>
  );
};

export default Login;
