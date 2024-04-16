import axios from "axios";
import { notify, notifyError } from "./toastify";
import { access } from "fs";
import { error } from "console";
import {
  bookingSchema,
  loginProps,
  registerProps,
  OTPDetails,
  calculateSchema,
} from "@/app/dashboard/components/Interface";

const api = "https://api.360shotitz.com/api/v1";

// export function getCookie(cookieName: string) {
//   const name = cookieName + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookieArray = decodedCookie.split(";");

//   for (let i = 0; i < cookieArray.length; i++) {
//     let cookie = cookieArray[i];
//     while (cookie.charAt(0) === " ") {
//       cookie = cookie.substring(1);
//     }
//     if (cookie.indexOf(name) === 0) {
//       return cookie.substring(name.length, cookie.length);
//     }
//   }
//   return null; // Return null if the cookie is not found
// }

export const setConfig = (accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return config;
};

export const setProfileConfig = (accessToken: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };

  return config;
};

let count = 0;

const refreshToken = async () => {
  const Type = localStorage.getItem("Type");
  let refreshToken;
  if (Type === "client") {
    refreshToken = localStorage.getItem("refreshToken");
  } else if (Type === "admin") {
    refreshToken = localStorage.getItem("adminRefreshToken");
  }
  console.log(refreshToken);
  count++;
  if (count > 5) {
    window.location.pathname = "/auth/login";
  }
  await axios
    .post(
      `${api}/auth/refresh/`,
      { refresh: refreshToken },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.status === "success") {
        if (Type === "client") {
          localStorage.setItem("refreshToken", response.data.data.refresh);
          localStorage.setItem("accessToken", response.data.data.access);
        } else if (Type === "admin") {
          localStorage.setItem("adminRefreshToken", response.data.data.refresh);
          localStorage.setItem("adminAccessToken", response.data.data.access);
        }
        console.log(response);
      }
    })
    .catch((err) => {
      console.log("refresh error");
      if (err.response.data.message) {
        console.log(err.response.data.message);
        // notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

axios.interceptors.response.use(
  (response) => {
    console.log("responding...");
    // If the response is successful, return it directly
    return response;
  },
  async (error) => {
    if (
      error.config.url !== "/auth/login/" &&
      error.config.url !== "/auth/register/" &&
      error.response
    ) {
      // If the error is a 401, attempt to refresh the token
      if (error.response.status === 401 && !error.config._isRetry) {
        // Mark the request for retry to prevent an infinite loop
        error.config._isRetry = true;
        try {
          // Refresh the token
          const Type = localStorage.getItem("Type");
          console.log("automatically refreshing token...");
          await refreshToken();
          console.log(Type);
          const updatedConfig = {
            ...error.config,
            headers: {
              ...error.config.headers,
              Authorization: `Bearer ${localStorage.getItem(
                Type === "client" ? "accessToken" : "adminAccessToken"
              )}`,
            },
          };
          // Retry the original request
          return axios(updatedConfig);
          // return axios(error.config);
        } catch (refreshError) {
          console.log("refresh error");
          // Handle token refresh failure
          return Promise.reject(refreshError);
        }
      }
    }
    // For other errors, reject the promise
    return Promise.reject(error);
  }
);

export const userLogin = async (data: loginProps, router: any) => {
  await axios
    .post(`${api}/auth/login/`, data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        localStorage.setItem("refreshToken", response.data.data.refresh);
        localStorage.setItem("accessToken", response.data.data.access);
        console.log(response.data.data);
        console.log("authenticated user login");
        notify(response.data.message);
        router.push("/dashboard");
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const userRegistration = async (data: registerProps) => {
  await axios
    .post(`${api}/auth/register/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.message) {
        localStorage.setItem("userEmail", data.email);
      }
      notify(response.data.message);
      window.location.pathname = "/login";
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const resetPasswordOTP = async (email: string) => {
  await axios
    .post(
      `${api}/auth/send-password-reset-otp/`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log(response);
      if (response.data.message) {
        notify(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const verifyOTP = async (
  data: OTPDetails,
  router: any,
  type: string
) => {
  await axios
    .post(`${api}/auth/verify-email/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.message) {
        notify(response.data.message);
        if ((type = "registeration")) {
          router.push("/auth/login");
        } else {
          router.push("/dashboard/profile");
        }
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const resendVerificationOTP = async (data: any) => {
  await axios
    .post(`${api}/auth/resend-verification-email/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.message) {
        notify(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const logOutUser = async (accessToken: string) => {
  await axios
    .get(`${api}/auth/logout/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
};

export const recentBookingsAndImages = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/store/bookings-and-images/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const retrieveAllUserBookings = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/store/bookings/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const calculateAmount = async (
  accessToken: string,
  data: calculateSchema
) => {
  let result: any = [];
  await axios
    .post(`${api}/store/calculate-amount/`, data, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log("amount calculated");
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
  return result;
};

export const createBookings = async (data: bookingSchema) => {
  let result: any = [];
  await axios
    .post(
      `${api}/store/bookings/`,
      data.location
        ? data
        : {
            phone: data.phone,
            plan: data.plan,
            shoot_type: data.shoot_type,
            number_of_shoot: data.number_of_shoot,
            shooting_date: data.shooting_date,
            shooting_time: data.shooting_time,
          },
      setConfig("accessToken")
    )
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        notify(response.data.message);
        result = response.data.data;
        console.log("bookings created");
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
  return result;
};

export const getPhotos = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/profiles/photos/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const retrieveProfile = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/profiles/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const updateProfile = async (data: any) => {
  await axios
    .patch(`${api}/profiles/`, data, setProfileConfig("accessToken"))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        notify(response.data.message);
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
      console.log(err);
    });
};

export const retrieveAvailablePlans = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/store/plans/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};

export const retrieveBankDetails = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/store/account-detail/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        result = response.data.data;
        console.log(response.data.message);
      }
    })
    .catch((err) => {
      if (err.response.data.message) {
        notifyError(err.response.data.message);
      } else {
        notifyError("Network Error");
      }
    });
  return result;
};
