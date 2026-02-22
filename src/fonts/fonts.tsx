import { Open_Sans, Playfair_Display } from "next/font/google";

export const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-open-sans",
});

export const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
});