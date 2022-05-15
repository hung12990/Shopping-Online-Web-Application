import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { add } from "../api/AccountApi";

const Register = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) =>{
    const account = {
      "username": data.username,
      "password": data.password,
       "name": data.name,
       "email": data.email
    }

    try {
      await add(account);
      history.push("/login");
      toast.success("Đăng ký thành công.");
    } catch (error) {
      toast.error(error.response.data.Errors);
    }
  
  };

  return (
    <div>
      <main className="form-signin col-4 offset-4 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="h1 mb-3 fw-normal text-danger fw-bolder text-center">
            Đăng ký
          </h1>
          <div className="form-floating mb-3">
          <input
            type="text"
            {...register("username", { required: true })}
            className="form-control"
            placeholder="name"
          />
          <label htmlFor="floatingInput">Username</label>
          {errors.username && (
            <div id="emailHelp" className="form-text">
              Username is required
            </div>
          )}
        </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              {...register("name", { required: true })}
              className="form-control"
              placeholder="name"
            />
            <label htmlFor="floatingInput">Name</label>
            {errors.name && (
              <div id="emailHelp" className="form-text">
                Name is required
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              {...register("email", { required: true })}
              className="form-control"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
            {errors.email && (
              <div id="emailHelp" className="form-text">
                Email is required
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
              <input type="checkbox" {...register("check", { required: true })} defaultValue="remember-me" />
              
              Đồng ý với điều khoản của Công Minh
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Đăng ký
          </button>
          <p className="mt-5 mb-3 text-muted text-center">© 1994-2022</p>
        </form>
      </main>
    </div>
  );
};

export default Register;
