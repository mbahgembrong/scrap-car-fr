"use strict";
const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");
const jar = new CookieJar();
const client = wrapper(
  axios.create({
    jar,
    // proxy: { protocol: "SOCKS5", host: "192.111.137.35", port: "4145" },
  })
);

(async () => {
  // get coockie
  // ganti dynamic with caracteristic of your device
  let data = '{"deprecation":"4504a5eabfd245d4463be9e0cd8960943d511027"}';

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.leboncoin.fr/appsdata/config/android/100.11.1",
    headers: {
      Host: "api.leboncoin.fr",
      Accept: "application/json,application/hal+json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; Redmi Note 8 Build/QQ3A.200805.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 #Android;android10;11.0.0",
      "Content-Type": "application/json; charset=UTF-8",
      "Content-Length": "58",
      "Accept-Encoding": "gzip, deflate",
    },
    data: data,
  };

  await axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
})();
