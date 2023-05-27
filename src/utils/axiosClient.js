// use of axios
// api base url
// header set

//imports
import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";

//this will used to call any api
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL, // always  -> actually write in envirnment variable // backend base url
  withCredentials: true, // for cookies sent
});

// interceptor(ISP) -> one time needed only -> implemented on fronEnd

//Note -< in login and signup we have to not set any middleware who is going to be required user to have authorization
// so middleware u have set required autorization only then it will be checked
// by that end point

// response interceptor->  get rejult from backend
// check if 401 -> mean AT expires or RT expires
// then Response ISP calls refresh api
// get new access token -> setted
// now that api call which fails again called with new access token
// u will be getting rejult -> be happy

// request interceptor -> from frontEnd if we will be sending any thing to backend at time of api call
// authorization header
// in each api call Access token goes form verification
// each api not doing that from local storage get AT and verify then send to api headers

// request interceptor
// on each api call it runs
// loaded AT in header so that each api call other than login and sign requires that user has logged in or
// user should be valid

axiosClient.interceptors.request.use(
  // request goes successfull -> handle request from frentEnd -> sends to backkend

  (request) => {
    console.log("(request ISP) Called ! ");

    // taking access token from local storage -> logged user / login time it setted to local storage by fronEnd
    const access_token = getItem(KEY_ACCESS_TOKEN);

    // sending request by loading into authorization -> previousaly we setting in insomia by manually
    // request.headers["Authorization"] = `Bearer ${access_token}`;

    request.headers["Authorization"] = `Bearer ${access_token}`;

    // on each request / api call authorization headers is set automatically
    return request;
  }

  // on sending of request itself we got error
  // (error)=>{

  // }
);

axiosClient.interceptors.response.use(
  // handle response -> comes from backend to frontEnd
  async (response) => {
    // get data from response from our backend | some other format by axios

    console.log(" (response ISP) called! ");

    // response ->comes to axios
    // obejct -> {config,data,status,statusText,headers}
    // data is actual data

    const data = response.data; // actual data
    // console.log("response ISP (actual data)! ", data);

    if (data.status === "ok") {
      // no error we have got
      return data; // no error
    }

    // now means we got error
    // error

    const originalRequest = response.config; // from data return by axios after modification we get details about response
    const statusCode = data.statusCode;
    const error = data.message;

    // console.log(" response ISP (originaRequest) - ", originalRequest);
    // console.log(" response ISP  (statusCode) - ", statusCode);
    // console.log(" response ISP (error)- ", error);

    // in case of 401 ->means AT expires-> do refresh AT
    // 401 also comes from refresh API-> mean then it goes to expires only
    // refresh Api sends 401 means -> logout -> RT expires

    // when refesh token expires and user sent to login page
    if (
      statusCode === 401 &&
      originalRequest.url ===
        `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`
    ) {
      // logout this user
      console.log("(response ISP )RT expires ");

      // remove AT from local storage
      removeItem(KEY_ACCESS_TOKEN);

      // now reload page sents user to login page-> also navigate method of react can be used
      window.location.replace("/login", "_self");

      return Promise.reject(error);
    }

    // now AT expires
    // call refresh API
    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // silently
      // generate new AT from calling refresh token api

      const response = await axios
        .create({
          withCredentials: true,
        })
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
      // refesh token it get from cookies itself
      // using RT it send new access token to us
      // in refesh api call also get error -> because RT expires

      // this response from axios so obejct wil be -> actual object

      // console.log("response ISP (AT expires new | AT get from /auth/refresh) - ",response);

      // refresh api done with it work
      // if status ok mean we got the new acces token

      if (response.data.status === "ok") {
        // setting new AT to localStorage
        setItem(KEY_ACCESS_TOKEN, response.data.rejult.new_access_token);

        // load new acces token into original request and call origial request
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.rejult.new_access_token}`;

        // call actoal original request
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }

  // error we are not sending  : we are sending object that has error message -> so no need to handle
  // we check status-> inside that obeject so we can do handle
  // (error) => {}
);
