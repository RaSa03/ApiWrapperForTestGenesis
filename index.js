import express from "express";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const API_TOKEN = process.env.access_token;
const PORT = process.env.PORT || 2107;
const DOMAIN = process.env.base_domain;
const link = `https://${DOMAIN}/api/v4/`;

const postReq = async (type) => {
  type = type.slice(5);
  const TYPES = {
    Сделка: "leads",
    Контакт: "contacts",
    Компания: "companies",
  };
  console.log(type, TYPES[type]);
  const reqValue = TYPES[type];

  return await fetch(link + reqValue, {
    method: "POST",
    body: JSON.stringify([{}]),
    headers: {
      Authorization: API_TOKEN,
    },
  }).then((response) => response.json());
};

app.use((req, res, next) => {
  const CURRENT_URL = ["http://localhost:3005", "https://rasa03.github.io"];
  const ACAO = req.headers.origin;

  if (CURRENT_URL.includes(ACAO)) {
    res.setHeader("Access-Control-Allow-Origin", ACAO);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  return next();
});

app.get("/api/:type", (req, res) => {
  postReq(req.params.type).then((json) => {
    res.send(json);
  });
});

app.listen(PORT, () => console.log("SERVER STARTED IN PORT :" + PORT));
