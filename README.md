# HRV-Mart Frontend
[![Build Pipeline](https://github.com/HRV-Mart/HRV-Mart/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/HRV-Mart/HRV-Mart/actions/workflows/build.yml)
## Features
- Login/Signup using **Email** and **Password**
- View Products on home screen with **load more products feature**
- **Product specific page** with product details
- Add or remove product from like section
- Add product to cart
- Change product qunatity in cart
- Order all products available in cart
- View previous orders
## API Endpoints
- `/login` to login user
- `/signup` to create user account
- `/product` get all products 
- `/product/PRODUCT_ID` get specific product
- `/cart` get authenticated user cart
- `/order` get authenticated user orders
- `/like` get authenticated user like product

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
