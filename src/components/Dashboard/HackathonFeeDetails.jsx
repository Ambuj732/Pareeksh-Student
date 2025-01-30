import { RPAY_KEY_ID, RPAY_KEY_SECRET } from "../../constants";
import React, { useEffect, useState } from "react";
import getPaidExamDetails from "../../actions/Dashboard/getPaidExamDetails";
import applyPromo from "../../actions/Dashboard/applyPromo";
import createPayment from "../../actions/Dashboard/createPayment";
import updatePayment from "../../actions/Dashboard/updatePayment";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRazorpay from "react-razorpay";
import getPaidHackathonDetails from "../../actions/Dashboard/getPaidHackathonDetails";

function HackathonFeeDetails() {
  const navigate = useNavigate();
  const [userinfo, setUser] = useState({});
  const [exam, setExam] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [promo, setPromo] = useState(0);
  const [finalamt, setFinalAmt] = useState(0);
  const [totaltax, setTotaltax] = useState(0);
  const [totaltaxAmt, setTotaltaxAmt] = useState(0);
  const [discountVal, setDiscountAmt] = useState(0);
  const [order, setOrder] = useState({});
  const [Razorpay] = useRazorpay();
  let taxv;
  let taxArr = [];
  let taxjson = [];
  let taxamount = 0;
  let totalfee = 0;
  const onOpen = () => {
    setPaymentModal(true);
  };

  const onClose = () => {
    setPaymentModal(false);
  };

  const getPaidExamDetailsHandler = async (examId) => {
    try {
      console.log("Hi hackthon");
      const userinfo = JSON.parse(localStorage.getItem("ps_loguser"));
      setUser(userinfo);
      const data = {
        usercode: userinfo?.usercode,
        id_self_student: userinfo?.id_self_student,
        id_banner: examId,
      };
      console.log(data);
      const response = await getPaidHackathonDetails(data);
      console.log(response);
      if (response.status == 200) {
        if (response?.data?.code == 1000) {
          const examInfo = response?.data?.hackathon;
          setExam(response?.data?.hackathon);
          if (examInfo.tax != undefined) {
            taxArr = examInfo.tax;
          }
          taxv = 0;
          for (var i = 0; i < taxArr.length; ++i) {
            taxv = taxv + taxArr[i].tax_value;
            taxjson[i] = {
              tax_name: taxArr[i].tax_name,
              tax_value: taxArr[i].tax_value,
            };
          }
          setTotaltax(taxv);
          taxamount = (examInfo.amount * taxv) / 100;
          setTotaltaxAmt(taxamount);
          totalfee = taxamount + examInfo.amount;
          setFinalAmt(totalfee);
          setDiscountAmt(0);
        } else {
          //	toast.error("An error in loading data. Please login again.");
          navigate("/");
          return;
        }
      } else {
        console.log("Error while getting paid exam details :: ", error);
      }
    } catch (error) {
      console.log("Error while getting paid exam details :: ", error);
    }
  };

  const applyPromoHandler = async () => {
    try {
      //console.log(userinfo);
      const data = {
        id_self_student: userinfo?.id_self_student,
        usercode: userinfo?.usercode,
        promo: coupon,
        type: 2,
      };
      console.log(data);
      const response = await applyPromo(data);
      console.log(response);
      if (response?.data?.code !== 1000) {
        toast.error(response?.data?.status);
        //console.log("Message :: ", response?.data?.status);
        setCoupon("");
        return;
      }
      //console.log(response?.data?.promo?.id);
      setPromo(response?.data?.promo);
      const discountPer = response?.data?.promo?.discount_percentage;
      const discountValue = (exam?.exam_fee?.exam_fee * discountPer) / 100;
      const applyDiscount = (exam?.exam_fee?.exam_fee - discountValue).toFixed(
        2
      );
      setDiscountAmt(discountValue);
      const newAmt = parseFloat(applyDiscount) + parseFloat(totaltaxAmt);
      setFinalAmt(newAmt);
    } catch (error) {
      console.log("Error while applying promo :: ", error);
    }
  };

  const createPaymentHandler = async () => {
    try {
      const userinfo = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log(userinfo);
      const data = {
        generic_type: 1,
        id_self_student: userinfo?.id_self_student,
        usercode: userinfo?.usercode,
        id_hack: 2,
        id_exam: exam?.id_exam,
        id_promo: promo ? promo.id : 0,
      };
      console.log(data);
      const response = await createPayment(data);
      console.log(response);
      console.log(response?.data?.payment_detail);
      if (response?.data?.code == 1000) {
        const id_student_payments =
          response?.data?.payment_detail.id_student_payments;
        setOrder(response?.data?.payment_detail);
        const options = {
          key: RPAY_KEY_ID,
          amount: finalamt,
          name: "Pareekshn Skill",
          description: "Payment of mock paid examination",
          image: "https://www.pareekshn.com/assets/images/logo.png",
          order_id: response?.data?.payment_detail.id,
          handler: function (responseR) {
            console.log(
              "razorpay_payment_id: " + responseR.razorpay_payment_id
            );
            console.log("razorpay_order_id: " + responseR.razorpay_order_id);
            console.log("razorpay_signature: " + responseR.razorpay_signature);
            // apply update payment api here
            if (responseR.razorpay_payment_id) {
              updatePaymentHandler(
                responseR.razorpay_payment_id,
                id_student_payments
              );
            }
          },
          prefill: {
            name: userinfo?.student_name,
            email: userinfo?.email,
            contact: userinfo?.mobile,
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzpay = new Razorpay(options);
        rzpay.open();
        rzpay.on("payment.failed", function (responseR) {
          console.log(responseR.error.code);
          console.log(responseR.error.description);
          console.log(responseR.error.source);
          console.log(responseR.error.step);
          console.log(responseR.error.reason);
          console.log(responseR.error.metadata.order_id);
          console.log(responseR.error.metadata.payment_id);
          toast.success(
            "Payment was unsuccessful due to a temporary issue. If amount got deducted, it will be refunded within 5-7 working days."
          );
        });
      }

      //updatePaymentHandler(response?.data?.payment_detail);
    } catch (error) {
      console.log("Error while creating payment :: ", error);
      setPaymentModal(false);
    }
  };

  const updatePaymentHandler = async (rozar_paymentid, id_student_payments) => {
    //console.log(order);
    try {
      const userinfo = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log(userinfo);
      const data = {
        id_student_payments: id_student_payments,
        generic_type: 1,
        id_self_student: userinfo?.id_self_student,
        id_hack: 2,
        id_exam: exam?.id_exam,
        usercode: userinfo?.usercode,
        razorpay_payment_id: rozar_paymentid,
      };
      console.log(data);
      const response = await updatePayment(data);
      console.log(response);
      if (response?.data?.code == 1000) {
        toast.success(
          "The payment successfully done. You will redirected to your dashbaord!"
        );
        navigate("/dashboard/exams");
      } else {
        toast.success(
          "Payment was unsuccessful due to a temporary issue. If amount got deducted, it will be refunded within 5-7 working days."
        );
        setPaymentModal(false);
      }
    } catch (error) {
      console.log("Error while updating payment :: ", error);
    }
  };

  useEffect(() => {
    const url = window?.location?.href;
    const examId = url?.split("/")?.pop();
    getPaidExamDetailsHandler(examId);
  }, []);

  return (
    <div className="flex flex-col font-custom">
      <div className="flex flex-col m-4 p-4 rounded-xl gap-6 bg-white ">
        <span className="text-xl font-semibold text-[#1C4481]">
          Hackthon Detail
        </span>
        <div className="flex justify-between ">
          <div className="flex flex-col">
            <span className="font-medium tex-sm text-[#1C4481]">Title</span>
            <span>{exam?.hackthon_title}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tex-sm text-[#1C4481]">Sector</span>
            <span>{exam?.sector}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tex-sm text-[#1C4481]">Course</span>
            <span>{exam?.course_name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tex-sm text-[#1C4481]">
              Difficulty Level
            </span>
            <span>{exam?.level_difficulty_name}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tex-sm text-[#1C4481]">
              State/City
            </span>
            <span>
              {exam?.state}/{exam?.city}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tex-sm text-[#1C4481]">Passing%</span>
            <span>{exam?.passing_percentage} Min</span>
          </div>
        </div>
      </div>
      <div className="bg-white m-4 rounded-xl">
        <div className="flex justify-between pr-14 px-4 pt-4">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-medium text-[#1C4481]">Exam Fee</span>
            <span className="font-medium text-xl">₹ {exam?.amount}</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xl font-medium text-[#1C4481]">
              Use Coupon
            </span>
            <div>
              <div className="flex gap-4 items-center">
                <input
                  className="flex items-center justify-center bg-[#1C44811A] h-9 w-44 rounded-md shadow-customShadow text-[#33363F8F] outline-none px-4"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <div
                  className="h-9 w-24 bg-[#1C4481] rounded-full flex items-center justify-center cursor-pointer text-white"
                  onClick={applyPromoHandler}
                >
                  <span>Apply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] mx-4 h-1 my-2 mt-4 border-black"></div>
        <div className="flex flex-col gap-3">
          <span className="text-[#1C4481] px-4 font-medium text-xl">Tax</span>
          <div className="flex flex-col gap-2">
            {exam?.tax?.map((tax) => (
              <div className="flex justify-between w-3/4 pr-[110px] text-xl font-medium bg-[#CFDFF8] p-2 mx-2 mb-4 rounded-md">
                <span>{tax.tax_name}</span>
                <span>₹ {tax.tax_value} </span>
              </div>
            ))}
          </div>
          {exam?.tax && (
            <div className="flex justify-between w-3/4 pr-[110px] text-xl font-medium bg-[#CFDFF8] p-2 mx-2 mb-4 rounded-md">
              <span>Total Tax</span>
              <span>₹ {totaltax}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col m-4">
        <span className="text-[#1C4481] font-semibold">
          Cancellation Policy
        </span>
        {exam && <span className="text-sm">{exam?.cancellation_policy}</span>}
      </div>
      <div className="h-fit mx-4 bg-white rounded-3xl border-t border-[#1C4481] border-b my-8">
        <div className="w-2/3 p-8 flex flex-col gap-4 text-xl text-[#1C4481] font-semibold">
          <div className="flex justify-between">
            <span>Exam Fee</span>
            <span>₹ {exam?.exam_fee?.exam_fee}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>₹ {discountVal} </span>
          </div>
          {exam?.tax && (
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹ {totaltaxAmt}</span>
            </div>
          )}
          <hr className="border-1 border-neutral-500" />
          <div className="flex justify-between font-bold bg-[#CFDFF8] px-4 py-2 rounded-lg">
            <span>Total</span>
            <span>₹ {finalamt}</span>
          </div>
        </div>
      </div>
      <div
        className="flex justify-center items-center h-40"
        onClick={createPaymentHandler}
      >
        <div
          className="h-16 flex items-center justify-center text-xl bg-[#1C4481] w-1/5 rounded-[50px] font-semibold text-white cursor-pointer"
          onClick={onOpen}
        >
          <span>Pay Now</span>
        </div>
      </div>
      {paymentModal && (
        <div className="flex items-center justify-center h-screen w-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed bg-[#1c4481ad]">
          <div className="h-2/3 w-2/5 flex items-center justify-center rounded-3xl opacity-100 bg-white z-[10]">
            <div className="flex flex-col items-center justify-between h-1/2">
              {/* <span className="font-semibold text-xl text-[#1C4481]">
								Cancel payment
							</span> */}
              <div className="flex flex-col items-center">
                <span>Your payment is ongoing.</span>
                <span>Please don't refresh or back your page...</span>
              </div>
              {/* <div className=" flex justify-between w-full gap-8">
								<div
									className="h-12 w-full bg-[#1C4481] flex items-center justify-center rounded-full cursor-pointer"
									onClick={onClose}
								>
									<span className="text-white">Yes</span>
								</div>
								<div
									className="h-12 w-full flex items-center justify-center rounded-full border-2 border-[#e61a1a] cursor-pointer"
									onClick={onClose}
								>
									<span className="text-[#1C4481]">No</span>
								</div>
							</div> */}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default HackathonFeeDetails;
