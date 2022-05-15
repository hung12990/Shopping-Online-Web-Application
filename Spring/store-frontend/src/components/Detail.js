import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { findOne } from "../api/ProductApi";
import { toast } from "react-toastify";

const Detail = (props) => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  const history = useHistory();

  useEffect(() => {
    findOne(id).then((response) => setProduct(response.data));
    console.log(1);
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
      {product && (
        <div className="col-8 offset-2">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={require(`../static/images/${product.image}`)}
                  className="img-fluid rounded-start"
                  style={{ width: 500, height: 300 }}
                  alt=""
                />
              </div>
              <div className="col-md-8 text-center">
                <div className="card-body">
                  <h2 className="card-title text-danger fw-bolder">
                    {product.name}
                  </h2>
                  <p className="card-text fw-bold fs-5">
                    Giá: {product.price} USD
                  </p>
                  <p className="card-text">
                    <small className="text-muted fs-6 fw-bolder">
                      {product.description}
                    </small>
                  </p>
                  <button type="button" class="btn btn-primary"  onClick={() => handleAdd(product)}>
                    Mua hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
