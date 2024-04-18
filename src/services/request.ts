import axios from "axios";
import { notify, notifyError } from "./toastify";

const api = "https://api.360shotitz.com/api/v1";

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
      notifyError("Network Error");
      console.log(err);
    });
};

axios.interceptors.response.use(
  (response) => {
    console.log("responding...");
    return response;
  },
  async (error) => {
    if (
      error.config.url !== "/auth/login/" &&
      error.config.url !== "/auth/register/" &&
      error.response
    ) {
      if (error.response.status === 401 && !error.config._isRetry) {
        error.config._isRetry = true;
        try {
          await refreshToken();
          const Type = localStorage.getItem("Type");
          console.log("automatically refreshing token...");
          const updatedConfig = {
            ...error.config,
            headers: {
              ...error.config.headers,
              Authorization: `Bearer ${localStorage.getItem(
                Type === "client" ? "accessToken" : "adminAccessToken"
              )}`,
            },
          };
          return axios(updatedConfig);
        } catch (refreshError) {
          console.log("refresh error");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const userLogin = async (data, router) => {
  await axios
    .post(`${api}/auth/login/`, data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        localStorage.setItem("refreshToken", response.data.data.refresh);
        localStorage.setItem("accessToken", response.data.data.access);
        console.log("authenticated user login");
        notify(response.data.message);
        router.push("/dashboard");
      }
    })
    .catch((err) => {
      notifyError("Network Error");
      console.log(err);
    });
};

export const userRegistration = async (data) => {
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
        notify(response.data.message);
        window.location.pathname = "/login";
      }
    })
    .catch((err) => {
      notifyError("Network Error");
      console.log(err);
    });
};

export const logOutUser = async (accessToken: string) => {
  await axios
    .get(`${api}/auth/logout/`, setConfig(accessToken))
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        console.log("Logged out successfully");
      }
    })
    .catch((err) => {
      notifyError("Network Error");
      console.log(err);
    });
};
