## Sunken Atlas - the Forbidden Island layout editor

See the project running live at [SunkenAtlas.com](https://sunkenatlas.com).

Get the code [on github](https://github.com/user24/forbidden-island-editor).

A side project by [Howard Yeend](https://solidred.co.uk).

## Running development server

```bash
npm run dev
```

## Deploying

Typically, next.js apps required a node-capable host. Sunken Atlas uses static export in order to use basic LAMP virtual hosting.

To ensure dynamic routing works, we use a custom `.htaccess` which redirects requests to the correct files. This exists in the repository under `/public`, and will get automatically moved into `/out` when you export the app:

```bash
npm run export
```

To deploy, simply upload everything in `/out` to the host root. You will need to clear the browser cache.

## Boilerplate next.js readme

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
