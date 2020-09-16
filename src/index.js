import compression from "compression";
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom"
import { StaticRouter as Router } from "react-router-dom";
import Hello from "./public/components/Hello";
import MasterForm from "./public/components/masterForm";
import MultipleRoutes from "./public/components/MultipleRoutes";

const app = express();
const cors = require('cors');

app.use(compression());
app.use(cors())

app.use("/static", express.static(path.resolve(__dirname, "public")));
app.use('/static/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/static/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/static/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')))


app.get("/", (req, res) => {
  const { name = "Marvelous Wololo" } = req.query;

  const componentStream = ReactDOMServer.renderToNodeStream(
    <Hello name={name} />
  );

  const htmlStart = `<!doctype html>
    <html>
    <head>
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <style>
        body { font-family: Arial, sans-serif; font-size: 15px; }
      </style>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({ name })}</script>
    </head>
    <body>
    <div id="root">    `;

  res = res.set('Content-Type', 'text/html')
      .set('Access-Control-Allow-Origin', ' *')
  res.write(htmlStart);

  componentStream.pipe(res, { end: false });

  const htmlEnd = `</div>
    <script src="http://localhost:3000/static/vendors~home.js~multipleRoutes.js"></script>
    <script src="http://localhost:3000/static/home.js"></script>
  </body>
  </html>`;

  componentStream.on("end", () => {
        res.write(htmlEnd);
    res.end();
  });
});


app.get("/nohtml", (req, res) => {
  const { name = "Marvelous Wololo" } = req.query;
  const renderResult = ReactDOMServer.renderToString (
      <Hello name={name} />
  );
  const response = `<div>`+renderResult+
    `<script src="http://localhost:3000/static/home.js"></script>
    </div>`;
    res.set('Content-Type', 'text/html')
      .set('Access-Control-Allow-Origin', ' *')
      .send(response);
});

app.get("/masterform", (req, res) => {
  const componentStream = ReactDOMServer.renderToNodeStream(
      <MasterForm />
  );
  const htmlStart = `
<link rel="stylesheet" href="./static/css/bootstrap.css">

<div id="masterFormDiv">`;
  res = res.set('Content-Type', 'text/html')
      .set('Access-Control-Allow-Origin', ' *');

  res.write(htmlStart);

  componentStream.pipe(res, { end: false });

  const htmlEnd = `</div><script src="http://localhost:3000/static/masterForm.js"></script>`;

  componentStream.on("end", () => {
    res.write(htmlEnd);
    res.end();
  });
});

app.get("/masterform2", (req, res) => {
  const componentStream = ReactDOMServer.renderToString(
      <MasterForm />
  );
  const htmlStart =
      `<link rel="stylesheet" href="./static/css/bootstrap.css">
        <div id="masterFormDiv">`;
  const htmlEnd = `</div><script src="http://localhost:3000/static/masterForm.js"></script>`;

  res.set('Content-Type', 'text/html')
      .set('Access-Control-Allow-Origin', ' *')
      .send(htmlStart+componentStream+htmlEnd);

});

app.get("/with-react-router*", (req, res) => {
  const context = {};

  const component = ReactDOMServer.renderToString(
    <Router location={req.url} context={context}>
      <MultipleRoutes />
    </Router>
  );

  const html = `
    <!doctype html>
      <html>
      <head>
        <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
        </style>
      </head>
      <body>
        <div id="root">${component}</div>

        <script src="/static/vendors~home.js~multipleRoutes.js"></script>
        <script src="/static/vendors~multipleRoutes.js"></script>
        <script src="/static/multipleRoutes.js"></script>
      </body>
      </html>`;

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    res.send(html);
  }
});

app.get("/tutorial.json", (req, res) => {
  fs.readFile(path.join(__dirname, "../README.md"), "utf8", (err, data) => {
    if (err) {
      console.error(err);

      return;
    } else {
      res.json({ data });
    }
  });
});

app.get("*", (req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
          h1 { color: #c7c7c7; text-align: center; }
        </style>
      </head>

      <body>
        <h1>404 - Not Found</h1>
      </body>
    </html>`);
});




const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log("######## app running ########"));
