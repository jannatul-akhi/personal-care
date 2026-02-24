"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Shipment from "@/components/shared/shipment/Shipment";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

const Checkout = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"outside" | "inside">(
    "outside",
  );
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">(
    "online",
  );

  const [formData, setFormData] = useState({
    firstName: "Didarul",
    lastName: "Islam",
    phone: "01846 48 06 44",
    email: "example@example.com",
    country: "Bangladesh",
    district: "Dhaka",
    city: "Dhaka-North",
    zip: "1230",
    address:
      "Tropical Akhand Tower, House 23, Gareeb-e-Newaz Ave, Dhaka 1230, Uttara Sector 11, Dhaka - North, Dhaka",
  });

  const [savedData, setSavedData] = useState({ ...formData });

  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Roses Tea Cup & Saucer Set",
      price: 28846,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=150&h=150&fit=crop",
      color: "Brown",
      size: "Free Size",
    },
    {
      id: 2,
      name: "Roses Tea Cup & Saucer Set",
      price: 28846,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=150&h=150&fit=crop",
      color: "Brown",
      size: "Free Size",
    },
    {
      id: 3,
      name: "Roses Tea Cup & Saucer Set",
      price: 28846,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=150&h=150&fit=crop",
      color: "Brown",
      size: "Free Size",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCharge = deliveryOption === "outside" ? 120 : 80;
  const totalSavings = 200;
  const totalAmount = subtotal + deliveryCharge - totalSavings;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSavedData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...savedData });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <span className="hover:text-gray-700 cursor-pointer">
            Shopping Cart
          </span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-red-600 font-medium">Checkout</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="hover:text-gray-700 cursor-pointer">
            Complete Order
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side - Shipping & Billing */}
          <div className="lg:col-span-7">
            {/* Shipping & Billing Section */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Shipping & Billing
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-600 hover:text-gray-800 flex items-center gap-1 text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        First Name<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-gray-400"
                          placeholder="First Name"
                        />
                        <User className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-gray-400"
                          placeholder="Last Name"
                        />
                        <User className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Phone<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-gray-400"
                          placeholder="Phone number"
                        />
                        <Phone className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        E-mail<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-gray-400"
                          placeholder="example@example.com"
                        />
                        <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Country<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 appearance-none focus:outline-none focus:border-gray-400 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="India">India</option>
                          <option value="Pakistan">Pakistan</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        District/State<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 appearance-none focus:outline-none focus:border-gray-400 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chittagong">Chittagong</option>
                          <option value="Khulna">Khulna</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        City/Area<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 appearance-none focus:outline-none focus:border-gray-400 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="Dhaka-North">Dhaka-North</option>
                          <option value="Dhaka-South">Dhaka-South</option>
                          <option value="Uttara">Uttara</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Zip/Postal Code<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 appearance-none focus:outline-none focus:border-gray-400 bg-white"
                        >
                          <option value="">Select</option>
                          <option value="1230">1230</option>
                          <option value="1200">1200</option>
                          <option value="1212">1212</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400 resize-none"
                      placeholder="House number and street name..."
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {savedData.firstName} {savedData.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        +880{savedData.phone.replace(/\D/g, "")},{" "}
                        {savedData.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">
                          Address:
                        </span>{" "}
                        {savedData.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Option */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Delivery Option
              </h2>
              <div className="flex gap-4">
                <label
                  className={`flex-1 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryOption === "outside"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="sr-only"
                    checked={deliveryOption === "outside"}
                    onChange={() => setDeliveryOption("outside")}
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mb-2 ${deliveryOption === "outside" ? "border-red-500 bg-red-500" : "border-gray-300"}`}
                    >
                      {deliveryOption === "outside" && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-800">$120</span>
                    <span className="text-sm text-gray-500">
                      Outside Of Dhaka
                    </span>
                  </div>
                </label>

                <label
                  className={`flex-1 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    deliveryOption === "inside"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    className="sr-only"
                    checked={deliveryOption === "inside"}
                    onChange={() => setDeliveryOption("inside")}
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mb-2 ${deliveryOption === "inside" ? "border-red-500 bg-red-500" : "border-gray-300"}`}
                    >
                      {deliveryOption === "inside" && (
                        <div className="w-full h-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-800">$80</span>
                    <span className="text-sm text-gray-500">
                      Inside Of Dhaka
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-lg p-6">
              <label className="block text-sm text-gray-600 mb-2">
                Do you want to add any note?
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-400 resize-none"
                placeholder="Write here ..."
              />
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-5">
            {/* Item Ordered */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Item Ordered
                </h2>
                <span className="text-gray-600">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Item
                </span>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {item.name} X {item.quantity}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>
                          <span className="font-medium">Color:</span>{" "}
                          {item.color}
                        </span>
                        <span>
                          <span className="font-medium">Size:</span> {item.size}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ৳{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Coupon Discount</span>
                  <button className="text-gray-800 hover:text-red-600 underline">
                    Apply Coupon
                  </button>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span>৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 text-lg pt-2 border-t border-gray-100">
                  <span>Total Amount</span>
                  <span>৳{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-1">
                Payment Method
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">
                        Online Payment
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      After clicking "Place Order", you will be redirected to
                      online payment to complete your purchase securely.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <div className="bg-white border rounded px-2 py-1 text-xs font-semibold text-blue-800">
                        AMEX
                      </div>
                      <div className="bg-white border rounded px-2 py-1 text-xs font-semibold text-orange-600">
                        ⚡
                      </div>
                      <div className="bg-white border rounded px-2 py-1 text-xs font-semibold text-red-600">
                        VISA
                      </div>
                      <div className="bg-white border rounded px-2 py-1 text-xs font-semibold text-pink-600">
                        bKash
                      </div>
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    className="mt-1"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">
                        Cash on delivery
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      We prioritizing frictionless payments
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Total Savings */}
            <div className="flex items-center gap-2 mb-4">
              <BadgePercent className="w-5 h-5 text-gray-800" />
              <span className="font-semibold text-gray-800">
                TOTAL SAVINGS:
              </span>
              <span className="font-semibold text-gray-800">
                ৳{totalSavings.toFixed(2)}
              </span>
            </div>

            {/* Confirm Order Button */}
            <button className="w-full bg-red-600 text-white py-3 rounded font-medium hover:bg-red-700 transition-colors mb-6">
              Confirm Your Order
            </button>

            {/* Return & Refund Policy */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">
                    Return & Refund Policy:
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Within 45 Days of Purchase
                  </p>
                </div>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">
                    Security & Privacy
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    We protect your privacy and keep your personal details safe
                    and secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Shipment />
      </div>
    </div>
  );
};

export default Checkout;
