import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0b121e] text-white pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-16">
          {/* Brand/About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               <Image 
                 src="/images/Logo.png" 
                 alt="Healthy Plus Logo" 
                 width={100} 
                 height={40} 
                 className="h-10 w-auto invert brightness-0" 
               />
            </div>
            <h2 className="text-xl font-serif font-bold leading-tight">
              Buy 100% Authentic Premium Beauty & Skin Care Products in BD
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Klassy Missy is more than just a business- it is a promise to provide not only exclusive skincare products but also knowledge and resources to help you make informed decisions about self care. We have helped numerous individuals achieve their self-care goals and gain confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-8">Quick Link</h3>
            <ul className="space-y-4">
              {["Home", "About Us", "Shop", "Our Blog", "Return Policy", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white text-[15px] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-8">Our Products</h3>
            <ul className="space-y-4">
              {[
                "Skin Treatment",
                "Hair Loss Treatment",
                "Piles Treatment",
                "Arthritis Joint Pain",
                "Kidney Stone Treatment",
                "Allergy Treatment",
              ].map((product) => (
                <li key={product}>
                  <a href="#" className="text-gray-400 hover:text-white text-[15px] transition-colors">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-8">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400 text-[14px] leading-relaxed">
                  2558 Hardman Road, Vermont, South Burlington, USA - 67452
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div className="flex flex-col text-gray-400 text-[14px]">
                  <span>+02)-574-328-301</span>
                  <span>+02)-574-328-301</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div className="flex flex-col text-gray-400 text-[14px]">
                  <span>info@yoursite.com</span>
                  <span>support@yoursite.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Socials */}
        <div className="pt-10 border-t border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-xl">
             <h4 className="text-xl font-serif font-bold mb-6">Join our newsletter to get latest update.</h4>
             <div className="flex w-full max-w-md bg-transparent rounded-full border border-gray-700 overflow-hidden px-1.5 py-1.5 focus-within:border-gray-500 transition-colors">
                <input
                  type="email"
                  placeholder="Enter Your E-mail"
                  className="flex-1 bg-transparent px-5 py-2 text-white placeholder-gray-500 focus:outline-none text-sm"
                />
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5c723d] hover:bg-[#4a5c31] text-white text-xs font-bold rounded-full transition-all group">
                  Subscribe Now <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
             </div>
          </div>

          <div className="flex gap-8 md:gap-12">
            {[
              { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
              { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
              { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
              { 
                icon: (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                ), 
                label: "Twitter" 
              },
            ].map((social) => (
              <a 
                key={social.label} 
                href="#" 
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center text-white group-hover:bg-[#5c723d] group-hover:border-[#5c723d] transition-all">
                  {social.icon}
                </div>
                <span className="text-[10px] text-gray-400 group-hover:text-white transition-colors uppercase font-bold tracking-wider">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Benariz@ 2025. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
