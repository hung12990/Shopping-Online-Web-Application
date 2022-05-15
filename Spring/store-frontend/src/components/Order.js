import React, { useState, useEffect } from "react";
import { findAll } from "../api/OrderApi";

const Order = () => {

  const [orders, setOrders] = useState([]);

  const username = localStorage.getItem('user');

  useEffect(() => {
    findAll(username).then((result) => setOrders(result.data));
  }, []);

  return (
    <div>
      <div className="container-fluid padding mb-5">
        <div className="row welcome mb-5 mt-5">
          <div className="col-10 offset-1 text-center text-danger ">
            <h6 className="display-4">Đơn hàng của tôi</h6>
            <hr className="my-4" />
          </div>
          {orders &&
            orders.map((item, index) => (
              <div className="col-10 offset-1 mb-5" key={index}>
                <div>
                  <div>
                    <h4 className="text-primary mb-3 ml-5">
                      Đơn hàng {item.id}
                    </h4>
                  </div>
                  <div className="row mb-5 order-img">
                    <div className="col-sm-3 ml-5">
                      <h6 className="card-title bolder">{item.address}</h6>
                    </div>
                    <div className="col-sm-2 text-center">
                      <h6 className="card-title bolder">{item.phone}</h6>
                    </div>
                    <div className="col-sm-2 text-center">
                      <h6 className="card-title bolder">{item.amount}</h6>
                    </div>
                    <div className="col-sm-2 text-center">
                      <h6 className="card-title bolder">{item.create}</h6>
                    </div>
                    <div className="col-sm-2 text-center text-danger">
                      <h6 className="card-title bolder">{item.status}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Order;

// <div className="row mb-5 order-img">
//         <div className="col-sm-3 ml-5">
//           <img className="img-fluid" src="./images/IP.jpg" alt="" />
//         </div>
//         <div className="col-sm-2 text-center">
//           <h6 className="card-title bolder">iPhone 13 Pro Max 128GB</h6>
//         </div>
//         <div className="col-sm-2 text-center">
//           <h6 className="card-title bolder">30.490.000₫</h6>
//         </div>
//         <div className="col-sm-2 text-center">
//           <h6 className="card-title bolder">1</h6>
//         </div>
//         <div className="col-sm-2 text-center text-danger">
//           <h6 className="card-title bolder">30.490.000₫</h6>
//         </div>
//       </div>