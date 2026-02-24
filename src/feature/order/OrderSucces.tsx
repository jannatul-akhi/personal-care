import React from "react";
import {
  ChevronRight,
  Printer,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  color: string;
  size: string;
  price: string;
}

const OrderSucces: React.FC = () => {
  const products: Product[] = [
    {
      id: "1",
      name: "New York Yankees Essential Black Cap",
      image:
        "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=200&h=200",
      quantity: 2,
      color: "Brown",
      size: "Free Size",
      price: "৳28,846",
    },
    {
      id: "2",
      name: "New York Yankees Essential Black Cap",
      image:
        "https://images.unsplash.com/photo-1602143407151-011141920e4b?auto=format&fit=crop&q=80&w=200&h=200",
      quantity: 2,
      color: "Brown",
      size: "Free Size",
      price: "৳28,846",
    },
    {
      id: "3",
      name: "New York Yankees Essential Black Cap",
      image:
        "https://images.unsplash.com/photo-1610443178009-6617631cc11a?auto=format&fit=crop&q=80&w=200&h=200",
      quantity: 2,
      color: "Brown",
      size: "Free Size",
      price: "৳28,846",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 text-sm font-semibold">
          <span className="text-gray-900">Shopping Cart</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-900">Checkout</span>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-gray-500">Complete Order</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {/* Success Message Section */}
        <div className="flex flex-col items-center justify-center pt-8 pb-12 text-center">
          <div className="mb-6 relative">
            <div className="text-red-500 transform -rotate-12">
              <PartyPopper size={64} strokeWidth={1.5} />
            </div>
            {/* Simple decorative dots/confetti */}
            <div className="absolute top-0 right-0 -mt-2 -mr-4 text-red-400 text-xs">
              .
            </div>
            <div className="absolute bottom-0 left-0 -mb-2 -ml-4 text-blue-400 text-xs">
              .
            </div>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Thank You for Your Order
          </h1>
          <p className="mb-8 max-w-lg text-sm text-gray-500 leading-relaxed">
            Thank you for your order! We're dedicated to providing you with the
            best service and hope you love your purchase.
          </p>
          <button className="bg-red-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-red-700 rounded-sm shadow-sm cursor-pointer">
            Continue Shopping
          </button>
        </div>

        {/* Zigzag Divider */}
        <div className="mb-12 overflow-hidden w-full max-w-4xl mx-auto">
          <svg
            className="w-full h-3 text-gray-200"
            viewBox="0 0 1200 12"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 L10,10 L20,0 L30,10 L40,0 L50,10 L60,0 L70,10 L80,0 L90,10 L100,0 L110,10 L120,0 L130,10 L140,0 L150,10 L160,0 L170,10 L180,0 L190,10 L200,0 L210,10 L220,0 L230,10 L240,0 L250,10 L260,0 L270,10 L280,0 L290,10 L300,0 L310,10 L320,0 L330,10 L340,0 L350,10 L360,0 L370,10 L380,0 L390,10 L400,0 L410,10 L420,0 L430,10 L440,0 L450,10 L460,0 L470,10 L480,0 L490,10 L500,0 L510,10 L520,0 L530,10 L540,0 L550,10 L560,0 L570,10 L580,0 L590,10 L600,0 L610,10 L620,0 L630,10 L640,0 L650,10 L660,0 L670,10 L680,0 L690,10 L700,0 L710,10 L720,0 L730,10 L740,0 L750,10 L760,0 L770,10 L780,0 L790,10 L800,0 L810,10 L820,0 L830,10 L840,0 L850,10 L860,0 L870,10 L880,0 L890,10 L900,0 L910,10 L920,0 L930,10 L940,0 L950,10 L960,0 L970,10 L980,0 L990,10 L1000,0 L1010,10 L1020,0 L1030,10 L1040,0 L1050,10 L1060,0 L1070,10 L1080,0 L1090,10 L1100,0 L1110,10 L1120,0 L1130,10 L1140,0 L1150,10 L1160,0 L1170,10 L1180,0 L1190,10 L1200,0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* Order Receipt Card */}
        <div className="mx-auto max-w-2xl bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-red-50/50 p-8 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {/* Logo Icon - Using UtensilsCrossed for a kitchen feel */}
                <div className="text-red-500 transform -rotate-45">
                  <UtensilsCrossed size={24} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-wide uppercase">
                  Crockery
                </span>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <p>House# 8/10 Block-C, Rarihari,</p>
                <p>Savar, Dhaka, Savar, Bangladesh</p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-sm text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              Print <Printer size={14} />
            </button>
          </div>

          <div className="p-8">
            {/* Customer & Order Details */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Didarul Islam
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  +8801738 552 616, info@info.com
                </p>
                <p className="text-xs text-gray-500 max-w-[250px] leading-relaxed">
                  Tropical Akhand Tower, House 23, Gareeb-e-Newaz Ave, Dhaka
                  1230, Uttara Sector 11, Dhaka - North, Dhaka
                </p>
              </div>
              <div className="md:text-right">
                <h3 className="text-sm font-bold text-gray-900 mb-1">
                  Order id: #253614
                </h3>
                <p className="text-xs text-gray-500">Date: 25 June, 2026</p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900 mb-6">
              Ordered Item
            </h4>

            {/* Items List */}
            <div className="space-y-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="flex gap-4 items-start">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-bold text-gray-900 max-w-[200px]">
                        {product.name}
                      </h5>
                      <span className="text-sm font-bold text-gray-900">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 mt-1">
                      X {product.quantity}
                    </p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-xs text-gray-500">
                        Color:{" "}
                        <span className="text-gray-500 font-medium">
                          {product.color}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Size:{" "}
                        <span className="text-gray-500 font-medium">
                          {product.size}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-end">
                <div className="w-full max-w-xs space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-500">Subtotal</span>
                    <span className="font-bold text-gray-900">৳2,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-500">
                      Coupon Discount
                    </span>
                    <span className="font-bold text-gray-900">৳2,500</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-500">
                      Delivery Charge
                    </span>
                    <span className="font-bold text-gray-900">৳120</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-gray-50 mt-2">
                    <span className="font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="font-bold text-gray-900">৳2,500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
              <h4 className="text-sm font-bold text-gray-900 mb-2">Note:</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                A top-rated choice for many kitchens, this model uses smart
                fuzzy logic technology to adjust cooking time and temperature
                automatically for perfectly cooked rice every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSucces;
