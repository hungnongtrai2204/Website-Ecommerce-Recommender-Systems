import { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutAddress = ({ handleCouponCode, couponRef, couponApplyMsg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { coupon_info } = useSelector((state) => state.coupon);
  return (
    <div className="tp-checkout-verify-item">
      <p className="tp-checkout-verify-reveal">
        Bạn muốn thêm địa chỉ giao hàng mới?{" "}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="tp-checkout-coupon-form-reveal-btn"
        >
          Bấm vào đây để thêm địa chỉ giao hàng của bạn
        </button>
      </p>

      {isOpen && (
        <div id="tpCheckoutCouponForm" className="tp-return-customer">
          <form onSubmit={handleCouponCode}>
            <div className="tp-return-customer-input">
              <label>Mã Giảm Giá :</label>
              <input ref={couponRef} type="text" placeholder="Mã giảm giá" />
            </div>
            <button
              type="submit"
              className="tp-return-customer-btn tp-checkout-btn"
            >
              Áp Dụng
            </button>
          </form>
          {couponApplyMsg && (
            <p className="p-2" style={{ color: "green" }}>
              {couponApplyMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutAddress;
