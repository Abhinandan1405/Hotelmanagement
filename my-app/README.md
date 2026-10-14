# React + Vite

## Run the app

Install dependencies with `npm install`, then run `npm run dev`. This starts
the Vite app and the JSON Server API used for hotel data together. The API
loads its initial records from `db.json` and listens on port 5000.

## Deploy to Netlify

The repository's `netlify.toml` configures Netlify to install dependencies and
build the app from `my-app`, then publish the generated `dist` directory.
The deployment command explicitly installs the locked dependencies, including
development tools such as Vite, before compiling the app. This also supports
CLI deployments where dependencies have not already been installed.
Unmatched page URLs serve `index.html`, so opening or refreshing an app URL
does not return Netlify's Page Not Found screen. Existing static assets are
served normally.

The hotel API currently runs locally on port 5000. This deployment configuration
publishes the frontend only; it does not deploy the local JSON Server API.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
