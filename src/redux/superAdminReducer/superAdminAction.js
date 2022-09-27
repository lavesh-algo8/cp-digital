import { callBackend } from "../../services/http.services";
import { openSnackBar } from "../utilityReducer/UtilityAction";

export const superAdminLogin = (formData) => async (dispatch) => {
  try {
    const resp = await callBackend("post", "superadmin/salogin", formData);
    console.log(resp);
    localStorage.setItem("token", resp?.token);
    localStorage.setItem("refreshToken", resp?.refreshToken);
    dispatch({
      type: "LOGIN",
      payload: {
        token: resp?.token,
        refreshToken: resp?.refreshToken,
        id: resp?._id,
        name: resp?.name,
        email: resp?.email,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAdminList = () => async (dispatch) => {
  try {
    const resp = await callBackend("get", "superadmin/listadmins");
    console.log(resp);
    dispatch({
      type: "GET_ADMINS",
      payload: resp?.admins?.map((item, index) => ({ ...item, id: index + 1 })),
    });
  } catch (e) {
    console.log(e);
  }
};

export const addAdmin = (formData) => async (dispatch) => {
  try {
    const resp = await callBackend("post", "superadmin/createadmin", formData);
    console.log(resp);
    if (resp?.message === "admin successfully created") {
      dispatch(openSnackBar(resp?.message, "success"));
      return true;
    } else {
      dispatch(openSnackBar(resp?.message, "error"));
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateAdmin = (formData, id) => async (dispatch) => {
  try {
    const resp = await callBackend(
      "put",
      `superadmin/updateadmin/${id}`,
      formData
    );
    console.log(resp);
    if (resp?.message === "admin updated successfully") {
      dispatch(openSnackBar(resp?.message, "success"));
      return true;
    } else {
      dispatch(openSnackBar(resp?.message, "error"));

      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const getSubAdminList = () => async (dispatch) => {
  try {
    const resp = await callBackend("get", "superadmin/listsubadmins");
    console.log(resp);
    dispatch({
      type: "GET_SUB_ADMINS",
      payload: resp?.data?.map((item, index) => ({ ...item, id: index + 1 })),
    });
  } catch (e) {
    console.log(e);
  }
};

export const addSubAdmin = (formData) => async (dispatch) => {
  try {
    const resp = await callBackend(
      "post",
      "superadmin/createsubadmin",
      formData
    );
    console.log(resp);
    if (resp?.message === "sub admin successfully created") {
      dispatch(openSnackBar(resp?.message, "success"));
      return true;
    } else {
      dispatch(openSnackBar(resp?.message, "error"));
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
