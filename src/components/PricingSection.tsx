"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PricingSection({ plans }) {
  const [loading, setLoading] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const handlePay = async (planId) => {
    setLoading(true);
    setSelectedPlanId(planId);

    try {
      const response = await axios.post("/api/midtrans", {
        plnid: planId,
        amount: 150000,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mail.com",
        phone: "081234567890",
      });

      const { token } = response.data.data;

      if (token) {
        window.snap.pay(token, {
          onSuccess: async function (result) {
            try {
              console.log(result, "result");
              toast.loading("Finalizing payment...");

              await axios.post("/api/plans", {
                plnid: planId,
                orderId: result.order_id,
                transactionId: result.transaction_id,
                amount: result.gross_amount,
                paymentType: result.payment_type,
                status: result.transaction_status,
              });

              await axios.post("/api/order", {
                plnid: planId,
                pay_mthod: result.payment_type,
                ordno: result.order_id,
                pay_stats: "S",
                pay_time: result.transaction_time,
                notes: "",
              });

              toast.dismiss();
              toast.success("Subscription created successfully!");
            } catch (error) {
              toast.dismiss();
              toast.error("Failed to save subscription data");
              console.error("Subscription error:", error);
            }
          },
          onPending: function (result) {
            toast("Payment pending", { icon: "⏳" });
            console.log(result);
          },
          onError: function (result) {
            toast.error("Payment error");
            console.log(result);
          },
          onClose: function () {
            toast("Payment window closed", { icon: "🛑" });
          },
        });
      }
    } catch (err) {
      console.error("Midtrans token error:", err);
      alert("Failed to create transaction");
    } finally {
      setLoading(false);
      setSelectedPlanId(null);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="inline-block w-5 h-5 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => {
        const isCurrentPlanLoading = loading && selectedPlanId === plan.id;

        return (
          <div
            key={index}
            className={`bg-white p-8 rounded-lg shadow-md relative ${
              plan.borderColor
            } ${plan.highlight ? "shadow-lg" : ""}`}
          >
            <div className={`w-full h-2 ${plan.barColor} mb-8 rounded`}></div>
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#e44b37] text-white px-4 py-1 rounded-full text-sm font-bold">
                {plan.badge}
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <p className="text-4xl font-bold mb-6">{plan.price}</p>
            <ul className="mb-8 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <ShieldCheck className="text-green-500 mr-2" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-md transition flex items-center justify-center ${
                plan.buttonClass
              } ${isCurrentPlanLoading ? "opacity-80 cursor-not-allowed" : ""}`}
              onClick={() => handlePay(plan.id)}
              disabled={loading}
            >
              {isCurrentPlanLoading ? (
                <>
                  <LoadingSpinner />
                  Loading...
                </>
              ) : (
                plan.button
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
