import { Gift, Headphones, RotateCcw, Truck } from "lucide-react";
import React from "react";

const Shipment = () => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Truck className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Free Shipping
            </h4>
            <p className="text-xs text-gray-500">When ordering over $100</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Headphones className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              24/7 Online Support
            </h4>
            <p className="text-xs text-gray-500">
              Get 24/7 support as you want
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <RotateCcw className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Return & Refund
            </h4>
            <p className="text-xs text-gray-500">Return money within 30 days</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Gift className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Gift Vouchers
            </h4>
            <p className="text-xs text-gray-500">
              20% off when you shop online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
