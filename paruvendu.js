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
  let listCount = 1;
  let page = 0;
  let km = 52;
  let codeLocation = "34XX0";
  // car -> VVO00000
  // motor -> VMO00000
  // van -> VCA00000
  let category = "VMO00000";
  while (listCount > 0) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://www.paruvendu.fr/communfo/appmobile/default/pa_search_list?key=Z5jGlZmZapmWmGqanMmUl1ZVaG9jaZqUZmuaa4hVpMmXosWipZmSl9q5a9vdnaTKlKA%3D&v=5.0&catId=${category}&MainCatId=${category}&p=${page++}&itemsPerPage=10&showdetail=1&sortOn=dateMiseEnLigne&sortTo=DESC&filters%5B_RY%5D=${km}&filters%5B_LO%5D=${codeLocation}&filters%5Bispro%5D=`,
      headers: {
        Host: "www.paruvendu.fr",
        "User-Agent":
          "Dalvik/2.1.0 (Linux; U; Android 10; Redmi Note 8 Build/QQ3A.200805.001)",
        "Accept-Encoding": "gzip, deflate",
      },
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (!response.data.feed.row.length) listCount = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }
})()
