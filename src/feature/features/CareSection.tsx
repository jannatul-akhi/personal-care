import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Women's Care",
    image: "/images/women.png",
    slug: "womens-care",
  },
  {
    name: "Kids Care",
    image: "/images/kids.png",
    slug: "kids-care",
  },
  {
    name: "Men's Care",
    image: "/images/man.png",
    slug: "mens-care",
  },
];

export function CareSection() {
  return (
    <section className="w-full py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.slug}`}
              className="flex items-center gap-6 bg-[#ecf1ee] rounded-none border border-2 border-transparent hover:border-gray-200 transition-all cursor-pointer text-center ps-3"
            >
              <div className="flex-shrink-0 w-[60px] h-[60px] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain -mt-3"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2d4a22] ">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
