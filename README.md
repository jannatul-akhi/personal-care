# Personal Care App - Frontend

The consumer-facing landing page and storefront for the Personal Care application, built with Next.js 15.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## 🛠️ Features

- **Modern UI**: Clean, responsive design with smooth animations using Framer Motion.
- **Product Catalog**: Paginated product list with advanced filtering (Category, Price, Rating).
- **Cart Management**: Persistent shopping cart with guest support and post-login merging.
- **User Auth**: Secure registration and login flow integrated with the backend.
- **Checkout Flow**: Seamless integration with Stripe for secure payments.
- **Toasts**: Beautiful notifications using Sonner and React Hot Toast.

## 🏁 Getting Started

### Installation

1. Install dependencies:
   ```bash
   bun install
   ```

2. Setup environment variables:
   Create a `.env` file with the following:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3030/api
   ```

### Development

Start the development server with Turbopack:
```bash
bun run dev
```

### Production

Build and start the production app:
```bash
bun run build
bun run start
```

## 🏗️ Architecture

- `src/app/`: Next.js App Router pages and layouts.
- `src/feature/`: Modularized feature components and logic.
- `src/redux/`: Redux store, slices, and RTK Query API definitions.
- `src/components/`: Reusable UI core components.
