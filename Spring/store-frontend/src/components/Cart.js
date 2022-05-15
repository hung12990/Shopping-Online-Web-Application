import { React } from "react";
import { NavLink } from "react-router-dom";

const Cart = (props) => {
  const amount = props.cart.reduce(
    (price, item) => price + item.price * item.quantity,
    0
  );

  const onHandleRemove = (item) => {
    props.onRemoveCart(item);
  };

  const onHandleAdd = (item) =>{
    props.onAddCart(item);
  }

  const onHandleSub = (item) =>{
    props.onSubCart(item);
  }
  return (
    <div className="container-fluid padding mb-5">
      <div className="row welcome mb-5 mt-5">
        <div className="col-10 offset-1 text-center text-danger ">
          <h6 className="display-4">Giỏ hàng</h6>
          <hr className="my-4" />
        </div>
        {props.cart.map((item, index) => (
          <div className="row col-10 offset-1 mb-5" key={index}>
            <div className="col-sm-2">
              <img
                className="img-fluid"
                src={require(`../static/images/${item.image}`)}
                alt=""
              />
            </div>
            <div className="col-sm-2 text-center">
              <h4 className="card-title mt-5 bolder">{item.name}</h4>
            </div>
            <div className="col-sm-2 text-center">
              <h4 className="card-title mt-5 bolder">{item.price} USD</h4>
            </div>
            <div className="col-sm-2 text-center mt-5">
            <button className="plus-btn" type="button" name="button" onClick={() => onHandleAdd(item)}>
              +
            </button>
              <input
                type="number"
                style={{ width: "50px" }}
                value={item.quantity}
                name="quantity"
                max={100}
                min={1}
              />{" "}
              <button className="plus-btn" type="button" name="button" onClick={() => onHandleSub(item)}>
              -
            </button>
            </div>
            <div className="col-sm-2 text-center text-danger">
              <h4 className="card-title mt-5 bolder">
                {item.price * item.quantity}
              </h4>
            </div>
            <div className="col-sm-2 text-center mt-5">
              <button type="submit" onClick={() => onHandleRemove(item)}>
                <i className="fa fa-trash-o" style={{ fontSize: "36px" }} />
              </button>
            </div>
          </div>
        ))}
        <div className="row col-10 offset-1 mb-5">
          <hr className="my-4" />
          <div className="col-sm-8">
            <h3 className="card-title bolder">Tổng tiền</h3>
          </div>
          <div className="col-sm">
            <h3 className="card-title bolder text-danger">{amount} USD</h3>
          </div>
          <div className="col-sm">
            <NavLink
              to="/checkout"
              exact
              type="button"
              className="btn btn-primary"
            >
              Đặt hàng
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
