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
const getId = (reference) => {
  const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 + 1;
  const firstId = reference.slice(0, 1);
  let firstIdVal = "";
  var regex = /^[a-zA-Z]+$/;
  if (firstId.match(regex)) {
    firstIdVal = 64 + alphaVal(firstId);
  } else {
    firstIdVal = firstId;
  }
  return `${firstIdVal}${reference.slice(1)}`;
};

(async () => {
  // get coockie
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://www.lacentrale.fr/app-empty",
    headers: {
      Host: "www.lacentrale.fr",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; Redmi Note 8 Build/QQ3A.200805.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36 #Android;android10;11.0.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "en-US,en;q=0.9",
      "X-Requested-With": "fr.carboatmedia.lacentrale",
    },
  };

  axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  //   let data = `cid=zMLarZ079h~b8X9AxQ1vt4jb2re2Kzuw63S8cCVA8R5wOKkJCROan~9m4b1St2Wz~tgXhkPtDXqKWd1nudLevzPQ1D0mtFoaIB4YP4NDs~_K5FFfEKdVFt77p~kHh9g_&ddv=1.2.2&ddvc=11.0.0&ddk=36C95FCC733A6BF92F5AC434FF65D7&request=${encodeURIComponent(
  //     `https://recherche.lacentrale.fr/v3/aggregations?aggregations?aggregations=${encodeURIComponent("MAKE_MODEL,ENERGY,MIN_AUTONOMY,MIN_BATTERY_CAPACITY,MAX_BATTERY_CONSUMPTION,CUBIC,REGION,CUSTOMER_FAMILY_CODE,TOP_OPTIONS,EQUIPMENT_LEVEL,EXTERNAL_COLOR,INTERNAL_COLOR,MAX_CONSUMPTION,CRITAIR_MAX,GEARBOX,GOOD_DEAL_BADGE")}&families=${("AUTO,UTILITY")}&families=${encodeURIComponent("AUTO,UTILITY")}&zipCode=34000&zipCodeDistance=50km`
  //   )}&os=Android&osr=29&osn=Android%2029&osv=29&mdl=Redmi%20Note%208&ua=undefined&inte=react-native-axios&screen_x=1080&screen_y=2128&screen_d=2.75&events=%5B%5D&camera=%7B%22auth%22%3Afalse%2C%20%22info%22%3A%22%22%7D`;

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "https://api-sdk.datadome.co/sdk/",
  //     headers: {
  //       Host: "api-sdk.datadome.co",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Content-Length": "881",
  //       "Accept-Encoding": "gzip, deflate",
  //       "User-Agent": "okhttp/4.9.2",
  //     },
  //     data: data,
  //   };

  //   await axios
  //     .request(config)
  //     .then((response) => {
  //       if (response.data.status === 200 && response.data.cookie) {
  //         //   add cookie to jar
  //         console.log(JSON.stringify(response.data));
  //         let cookie = response.data.cookie;
  //         let cookieArray = cookie.split(";");
  //         let cookieObj = {};
  //         cookieArray.forEach((element) => {
  //           let temp = element.split("=");
  //           cookieObj[temp[0]] = temp[1];
  //         });
  //         jar.setCookieSync(
  //           `datadome=${cookieObj.datadome}`,
  //           "https://recherche.lacentrale.fr"
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       throw error;
  //     });

  let total = 0;
  let seed = false;
  let LengthCar = 0;
  let loop = 0;
  while (total > LengthCar || !seed) {
    config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://recherche.lacentrale.fr/v4/search?families=AUTO%2CUTILITY&zipCode=34000&zipCodeDistance=50km&page=${loop}&pageSize=23&sort=&order=&seed=${seed}`,
      headers: {
        Host: "recherche.lacentrale.fr",
        Accept: "application/json, text/plain, */*",
        "X-Client-Source": "classified:android:lcpab",
        "X-Api-Key": "fc6bd56a1739407BA3C2b58191bbefa28801cce8",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/4.9.2",
        Connection: "close",
      },
    };

    await axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        for (const car of response.data.hits) {
          const reference = car.item.reference;

          const url = `https://www.lacentrale.fr/auto-occasion-annonce-${getId(
            reference
          )}.html`;
          console.log(url);
        }

        total = response.data.total;
        seed = response.data.seed;
      })
      .catch((error) => {
        console.log(error);
      });
    loop++;
  }
})();
