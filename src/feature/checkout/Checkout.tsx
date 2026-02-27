"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  BadgePercent,
  Edit2,
  ChevronDown,
  Plus,
  Loader2,
} from "lucide-react";
import Shipment from "@/components/shared/shipment/Shipment";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetCartQuery } from "@/redux/api/cart/cartApi";
import {
  useGetAddressesQuery,
  useCreateAddressMutation,
  Address,
} from "@/redux/api/address/addressApi";
import { usePlaceOrderMutation, PaymentMethod, DeliveryOption } from "@/redux/api/order/orderApi";
import { useCreateCheckoutSessionMutation } from "@/redux/api/payment/paymentApi";
import { toast } from "sonner";
import Image from "next/image";

const PLACEHOLDER = "/images/hero1.png";

const Checkout = () => {
  const router = useRouter();
  const isLoggedIn = !!useSelector((state: RootState) => state.user?.token);
  const guestCartId = useSelector((state: RootState) => state.cart?.guestCartId);

  // Redirect if not logged in (Order placement requires auth)
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // States
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("normal");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [notes, setNotes] = useState("");

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    country: "Bangladesh",
  });

  // Queries & Mutations
  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery({ guestCartId, isLoggedIn });
  const { data: addressData, isLoading: isAddressLoading } = useGetAddressesQuery(undefined, {
    skip: !isLoggedIn,
  });
  const [createAddress, { isLoading: isCreatingAddress }] = useCreateAddressMutation();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [createCheckoutSession, { isLoading: isCreatingSession }] = useCreateCheckoutSessionMutation();

  const cartItems = cartData?.data?.items ?? [];
  const addresses = addressData?.data ?? [];

  // Set default address on load
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAddress = async () => {
    if (!newAddress.fullName || !newAddress.phone || !newAddress.addressLine1 || !newAddress.city) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const res = await createAddress(newAddress).unwrap();
      setSelectedAddressId(res.data.id);
      setIsAddingNewAddress(false);
      toast.success("Address added successfully.");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to add address.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }

    try {
      const orderRes = await placeOrder({
        addressId: selectedAddressId,
        paymentMethod,
        deliveryOption,
        notes: notes.trim() || undefined,
      }).unwrap();

      if (paymentMethod === "stripe") {
        const sessionRes = await createCheckoutSession({ orderId: orderRes.data.id }).unwrap();
        if (sessionRes.url) {
          window.location.href = sessionRes.url;
          return;
        }
      }

      toast.success("Order placed successfully!");
      router.push("/order");
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong. Please try again.");
    }
  };

  const getPrice = (item: any) => {
    const p = item.product;
    return p.discountPrice > 0 ? p.discountPrice : p.price;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0);
  const deliveryCharge = deliveryOption === "express" ? 180 : 120;
  const totalAmount = subtotal + deliveryCharge;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  if (isCartLoading || isAddressLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <span
            className="hover:text-gray-700 cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            Shopping Cart
          </span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-red-600 font-medium">Checkout</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-400">Complete Order</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Shipping & Billing */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Shipping Address
                </h2>
                {!isAddingNewAddress && (
                  <button
                    onClick={() => setIsAddingNewAddress(true)}
                    className="text-red-600 hover:text-red-700 font-semibold text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    New Address
                  </button>
                )}
              </div>

              {isAddingNewAddress ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Full Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={newAddress.fullName}
                        onChange={handleAddressInputChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                        placeholder="e.g. Md Oli Ullah"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Phone<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleAddressInputChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                        placeholder="e.g. 01XXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        City<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressInputChange}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                        placeholder="e.g. Dhaka"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={newAddress.country}
                        className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 text-gray-500 cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Full Address<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="addressLine1"
                      value={newAddress.addressLine1}
                      onChange={handleAddressInputChange}
                      rows={3}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none"
                      placeholder="Street address, house no, area..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleCreateAddress}
                      disabled={isCreatingAddress}
                      className="bg-red-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isCreatingAddress && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save Address
                    </button>
                    <button
                      onClick={() => setIsAddingNewAddress(false)}
                      className="border border-gray-200 text-gray-600 px-8 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedAddressId === addr.id
                            ? "border-red-500 bg-red-50/50 shadow-md ring-1 ring-red-500"
                            : "border-gray-100 bg-white hover:border-gray-200"
                            }`}
                        >
                          <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-gray-900 line-clamp-1">{addr.fullName}</span>
                              {selectedAddressId === addr.id && (
                                <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center">
                                  <div className="h-2 w-2 rounded-full bg-white" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 shrink-0" /> {addr.phone}
                            </p>
                            <p className="text-sm text-gray-500 flex-1 line-clamp-2 italic">
                              {addr.addressLine1}, {addr.city}
                            </p>
                            {addr.isDefault && (
                              <span className="mt-3 inline-block self-start bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500 mb-4">No shipping addresses found.</p>
                      <button
                        onClick={() => setIsAddingNewAddress(true)}
                        className="bg-red-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-all"
                      >
                        Add First Address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Option */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-600" />
                Delivery Option
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${deliveryOption === "normal"
                    ? "border-red-500 bg-red-50/50 shadow-md ring-1 ring-red-500"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="sr-only"
                    checked={deliveryOption === "normal"}
                    onChange={() => setDeliveryOption("normal")}
                  />
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mb-3 flex items-center justify-center ${deliveryOption === "normal" ? "border-red-600 bg-red-600" : "border-gray-300"}`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">৳120</span>
                    <span className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                      Normal Delivery
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">Expected within 2-3 Days</p>
                  </div>
                </label>

                <label
                  className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${deliveryOption === "express"
                    ? "border-red-500 bg-red-50/50 shadow-md ring-1 ring-red-500"
                    : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="sr-only"
                    checked={deliveryOption === "express"}
                    onChange={() => setDeliveryOption("express")}
                  />
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mb-3 flex items-center justify-center ${deliveryOption === "express" ? "border-red-600 bg-red-600" : "border-gray-300"}`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">৳180</span>
                    <span className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">
                      Express Delivery
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">Expected within 12 Hours</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-lg p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                Order Notes (Optional)
              </h2>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none italic text-sm"
                placeholder="Write any special instructions for delivery..."
              />
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-5">
            {/* Item Ordered */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm ring-1 ring-slate-100 font-sans">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Summary</h2>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-slate-200">
                  {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
                </span>
              </div>

              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item: any) => {
                  const itemPrice = getPrice(item);
                  const imgUrl = item.product.featuredImage || PLACEHOLDER;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center group"
                    >
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-50 ring-1 ring-slate-100 shrink-0">
                        {imgUrl.startsWith("http") ? (
                          <img src={imgUrl} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <Image src={imgUrl} alt={item.product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        )}
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-bl-lg">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-gray-900">
                          ৳{(itemPrice * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-1">
                    <span>Coupon Discount</span>
                    <BadgePercent className="w-4 h-4 text-green-600" />
                  </div>
                  <button className="text-red-600 hover:text-red-700 font-bold underline decoration-dotted underline-offset-4">
                    Apply Coupon
                  </button>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-500">
                  <span>Delivery Charge</span>
                  <span className="text-slate-900 font-bold">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mt-2 ring-1 ring-slate-100 shadow-inner">
                  <span className="text-base font-bold text-gray-900">Total Payable</span>
                  <span className="text-2xl font-black text-red-600">৳{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 ring-1 ring-slate-100 shadow-sm">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs mb-1">
                Security Checkout
              </h3>
              <p className="text-[11px] font-medium text-gray-500 mb-6">
                All transactions are secure and encrypted.
              </p>

              <div className="space-y-3">
                <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${paymentMethod === 'cod' ? 'border-red-500 bg-white ring-1 ring-red-500 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 accent-red-600 h-4 w-4"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-700" />
                      <span className="font-bold text-gray-900 uppercase tracking-tight">Cash on delivery</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 font-medium leading-relaxed">
                      Pay with cash upon delivery of your items.
                    </p>
                  </div>
                </label>

                <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${paymentMethod === 'stripe' ? 'border-red-500 bg-white ring-1 ring-red-500 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1 accent-red-600 h-4 w-4"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-700" />
                      <span className="font-bold text-gray-900 uppercase tracking-tight">Online Payment (Card/Stripe)</span>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 font-medium leading-relaxed">
                      Pay securely with your credit or debit card via Stripe.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Confirm Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || isCreatingSession || cartItems.length === 0}
              className="w-full bg-red-600 text-white py-4.5 rounded-xl text-lg font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {(isPlacingOrder || isCreatingSession) ? <Loader2 className="w-6 h-6 animate-spin" /> : "Confirm Order"}
            </button>

            {/* Policy Info */}
            <div className="grid grid-cols-1 gap-3 mt-8">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl ring-1 ring-slate-100 shadow-sm">
                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900 uppercase">Trusted Shopping</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Safe and Secure Transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl ring-1 ring-slate-100 shadow-sm">
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-gray-900 uppercase">Free Returns</h4>
                  <p className="text-[10px] text-gray-500 font-medium">Within 30 Days of Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Shipment />
      </div>

      {/* Scrollbar Style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default Checkout;
