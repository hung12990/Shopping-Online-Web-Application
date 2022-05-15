import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { save } from "../api/OrderApi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { findOne } from "../api/AccountApi";

const Checkout = (props) => {
    const history = useHistory();

  const size = props.cart.length;

  const [account, setAccount] = useState({});

  const username = localStorage.getItem('user');

  const amount = props.cart.reduce(
    (price, item) => price + item.price * item.quantity,
    0
  );

  useEffect(() => {
    findOne(username).then((res) => setAccount(res.data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors},
} = useForm();


const onSubmit = async(data) =>{
  if(size > 0){
    const listDetail = props.cart.map(i => (
      {
        "product" : i,
        "quantity": i.quantity,
        "price": i.price
      }
    ));
    const result = {
      "address": `${data.address}, ${data.ward}, ${data.district}, ${data.city}`,
      "phone": data.phone,
      "amount": amount,
      "account":{
        "id": account.id
      },
      "details": listDetail
    }
    console.log(result);
    try {
      await save(result);
      props.onClearCart();
      history.push("/orders");
      toast.success("Đặt hàng thành công");
    } catch (error) {
      toast.error(error.response.data);
    }
  }else{
    toast.error("Giỏ hàng trống.");
  }
}
  return (
    <div>
      <main>
        <div className="py-5 text-center">
          <h2 className="text-danger">Đặt hàng đi bạn ơi</h2>
          <p className="lead">
            Vui lòng cung cấp địa chỉ chính xác không thì bạn sẽ bị đấm.
            <i className="fa fa-hand-grab-o" />
          </p>
        </div>
        <div className="row col-10 offset-1 g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Giỏ hàng của bạn</span>
              <span className="badge bg-primary rounded-pill">{size}</span>
            </h4>
            <ul className="list-group mb-3">
              {props.cart.map((item, index) => (
                <li className="list-group-item d-flex justify-content-between lh-sm" key={index}>
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">
                      {item.price} - {item.quantity}
                    </small>
                  </div>
                  <span className="text-muted">
                    {item.price * item.quantity} USD
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{amount}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Địa chỉ đơn hàng</h4>
            <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">Tỉnh/Thành phố</label>
                  <input type="text" {...register("city", {required: true})} className="form-control" />
                  {errors.title && <span>Không để trống Tỉnh/Thành phố</span>}
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Quận/Huyện</label>
                  <input type="text" {...register("district", {required: true})} className="form-control" />
                  {errors.title && <span>Không để trống Quận/Huyện</span>}
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Phường/Xã</label>
                  <input type="text" {...register("ward", {required: true})} className="form-control" />
                  {errors.title && <span>Không để trống Phường/Xã</span>}
                </div>
                <div className="col-12">
                  <label className="form-label">Địa chỉ</label>
                  <textarea  {...register("address", {required: true})}
                    className="form-control"
                    rows={3}
                    defaultValue={""}
                  />
                  {errors.title && <span>Không để trống Địa chỉ</span>}
                </div>
                <div className="col-sm-6">
                  <label className="form-label">Điện thoại di động</label>
                  <input type="text" {...register("phone", {required: true})} className="form-control" />
                  {errors.title && <span>Không để trống Điện thoại di động</span>}
                </div>
              </div>
              <button
                className="w-100 btn btn-primary btn-lg mt-5  mb-5"
                type="submit"
              >
                Đặt hàng
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
