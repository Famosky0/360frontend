import axios from "axios";
import { notify, notifyError } from "./toastify";
import { access } from "fs";
import { error } from "console";
import { loginProps } from "@/app/dashboard/components/Interface";
import { setConfig } from "./request";

const api = "https://api.360shotitz.com/api/v1";

export const adminLogin = async (data: loginProps, router: any) => {
  await axios
    .post(`${api}/auth/login/`, data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        localStorage.setItem("adminRefreshToken", response.data.data.refresh);
        localStorage.setItem("adminAccessToken", response.data.data.access);
        console.log("authenticated admin login");
        notify(response.data.message);
        window.location.pathname = "/u/admin";
        // router.push("/u/admin");
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

export const retrieveAllUserBookings = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/admin/bookings/`, setConfig(accessToken))
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

export const retrieveBookingDetails = async (
  accessToken: string,
  id: string
) => {
  let result: any = [];
  await axios
    .get(`${api}/admin/bookings/${id}/`, setConfig(accessToken))
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

export const updateBooking = async (data: any, id: string) => {
  await axios
    .patch(`${api}/bookings/${id}/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        console.log(response.data.message);
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

export const deliverImages = async (data: any, id: string) => {
  await axios
    .post(`${api}/admin/deliver/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      if (response.data.status === "success") {
        console.log(response.data.message);
        notify(response.data.message);
        window.location.pathname = "/u/admin";
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

export const adminDashboardDetails = async (accessToken: string) => {
  let result: any = [];
  await axios
    .get(`${api}/admin/dashboard/`, setConfig(accessToken))
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
