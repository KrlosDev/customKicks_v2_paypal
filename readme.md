# eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@email.com (Admin)
123456

john@email.com (Customer)
123456

jane@email.com (Customer)
123456
```

---

### FAQ: How do I use Vite instead of CRA?

Ok so you're at **Section 1 - Starting The Frontend** in the course and you've
heard cool things about [Vite](https://vitejs.dev/) and why you should use that
instead of [Create React App](https://create-react-app.dev/) in 2023.

There are a few differences you need to be aware of using Vite in place of CRA
here in the course after [scaffolding out your Vite React app](https://github.com/vitejs/vite/tree/main/packages/create-vite#create-vite)

#### Setting up the proxy

Using CRA we have a `"proxy"` setting in our frontend/package.json to avoid
breaking the browser [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) in development.
In Vite we have to set up our proxy in our
[vite.config.js](https://vitejs.dev/config/server-options.html#server-proxy).

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
```

#### Setting up linting

By default CRA outputs linting from eslint to your terminal and browser console.
To get Vite to ouput linting to the terminal you need to add a [plugin](https://www.npmjs.com/package/vite-plugin-eslint) as a
development dependency...

```bash
npm i -D vite-plugin-eslint

```

Then add the plugin to your **vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import the plugin
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // setup the plugin
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
```

#### Vite outputs the build to /dist

Create React App by default outputs the build to a **/build** directory and this is
what we serve from our backend in production.  
Vite by default outputs the build to a **/dist** directory so we need to make
some adjustments to our [backend/server.js]
Change...

```js
app.use(express.static(path.join(__dirname, '/frontend/build')));
```

to...

```js
app.use(express.static(path.join(__dirname, '/frontend/dist')));
```

and...

```js
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);
```

to...

```js
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
);
```

#### Vite has a different script to run the dev server

In a CRA project you run `npm start` to run the development server, in Vite you
start the development server with `npm run dev`  
If you are using the **dev** script in your root pacakge.json to run the project
using concurrently, then you will also need to change your root package.json
scripts from...

```json
    "client": "npm start --prefix frontend",
```

to...

```json
    "client": "npm run dev --prefix frontend",
```

Or you can if you wish change the frontend/package.json scripts to use `npm
start`...

```json
    "start": "vite",
```

#### A final note:

Vite requires you to name React component files using the `.jsx` file
type, so you won't be able to use `.js` for your components. The entry point to
your app will be in `main.jsx` instead of `index.js`

And that's it! You should be good to go with the course using Vite.

---

## License

The MIT License

Copyright (c) 2024 Carlos Barahona

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
