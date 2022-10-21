import { RestorePageTwoTone } from "@mui/icons-material";
import axios from "axios";
import { baseUrl, callBackend } from "../../services/http.services";
import { openSnackBar } from "../utilityReducer/UtilityAction";
import qs from "qs";

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

export const deleteAdmin = (id) => async (dispatch) => {
  try {
    const resp = await callBackend("delete", `superadmin/deleteadmin/${id}`);
    if (resp?.message) {
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

export const updateSubAdmin = (formData, id) => async (dispatch) => {
  try {
    const resp = await callBackend(
      "put",
      `superadmin/updatesubadmin/${id}`,
      formData
    );
    console.log(resp);
    if (resp?.message === "sub admin updated successfully") {
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

export const deleteSubAdmin = (id) => async (dispatch) => {
  try {
    const resp = await callBackend("delete", `superadmin/deletesubadmin/${id}`);
    if (resp?.message) {
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

// export const getDocuments = (law, act) => async (dispatch) => {
//   try {
//     const resp = await callBackend("get", `documents/getDocs/${law}/${act}`);
//     console.log("FILES", resp);
//     dispatch({
//       type: "GET_DOCUMENTS",
//       payload: resp?.file?.map((item, index) => ({
//         ...item,
//         id: index + 1,
//       })),
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getDocuments = () => async (dispatch) => {
  try {
    const resp = await callBackend("get", `docgen/procedures`);
    console.log(resp);
    dispatch({
      type: "GET_DOCUMENTS",
      payload: resp?.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addDocument = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "POST",
      url: `${baseUrl}/docgen/createheadings`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(formData),
    };

    const resp = await axios(config);
    console.log(resp);
    if (resp?.data.message === "headings saved successfully") {
      dispatch(openSnackBar("document successfully created", "success"));
      return true;
    } else {
      dispatch(openSnackBar(resp?.data.message, "error"));
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const addSectionDocumentHeading =
  (heading, sections) => async (dispatch) => {
    try {
      let config = {
        method: "POST",
        url: `${baseUrl}/docgen/addsections/${heading}`,
        headers: {
          "content-type": "application/json",
        },
        data: { formTitles: sections },
      };
      console.log(config);
      const resp = await axios(config);
      console.log(resp);
      if (resp?.data.message === "sections saved successfully") {
        dispatch(openSnackBar(resp?.data.message, "success"));
        return true;
      } else {
        dispatch(openSnackBar(resp?.data.message, "error"));
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const saveDocument = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/documents/savedocument`,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };

    const { data } = await axios(config);
    console.log("UPLOAD DATA", data);
    dispatch(openSnackBar(data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const saveRocFeeCalculator = (formData) => async (dispatch) => {
  try {
    const resp = await callBackend("post", "calculators/roc", formData);
    resp?.message && dispatch(openSnackBar(resp?.message, ""));
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export const saveNetWorthCalculator = (formData) => async (dispatch) => {
  try {
    const resp = await callBackend("post", "calculators/networth", formData);
    return resp;
  } catch (e) {
    console.log(e);
  }
};
