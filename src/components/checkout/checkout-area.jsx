import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
// internal
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutCoupon from "./checkout-coupon";
import CheckoutLogin from "./checkout-login";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddressCard from "./AddressCard";
import CheckoutAddress from "./checkout-address";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const CheckoutArea = ({ addresses, cart, setAddresses }) => {
  const checkoutData = useCheckoutSubmit();
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    handleCouponCode,
    couponRef,
    couponApplyMsg,
  } = checkoutData;
  // const { cart_products } = useSelector((state) => state.cart);
  const cart_products = cart.products;
  console.log("Cart", cart_products);
  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">No items found in cart to checkout</h3>
              <Link href="/shop" className="tp-checkout-btn">
                Return to shop
              </Link>
            </div>
          )}
          {cart_products.length > 0 && (
            <div className="row">
              <div className="col-xl-7 col-lg-7">
                <div className="tp-checkout-verify">
                  {/* <CheckoutLogin /> */}
                  <CheckoutCoupon
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                  />
                  <CheckoutAddress
                    handleCouponCode={handleCouponCode}
                    couponRef={couponRef}
                    couponApplyMsg={couponApplyMsg}
                  />
                </div>
              </div>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    {/* <CheckoutBillingArea register={register} errors={errors} /> */}
                    <div
                      className="tp-checkout-bill-area"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div className="row">
                        {addresses.map((address) => (
                          <div className="col-lg-6">
                            <AddressCard
                              address={address}
                              cart={cart}
                              setAddresses={setAddresses}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea
                      checkoutData={checkoutData}
                      cart={cart}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
