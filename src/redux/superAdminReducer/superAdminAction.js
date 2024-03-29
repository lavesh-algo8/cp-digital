import { RestorePageTwoTone } from "@mui/icons-material";
import axios from "axios";
import { baseUrl, callBackend } from "../../services/http.services";
import { openSnackBar } from "../utilityReducer/UtilityAction";
import qs from "qs";

export const superAdminLogin = (formData) => async (dispatch) => {
  try {
    const resp = await callBackend("post", "superadmin/salogin", formData);
    console.log(resp);
    if (resp) {
      localStorage.setItem("token", resp?.token);
      localStorage.setItem("refreshToken", resp?.refreshToken);
    }
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

export const superAdminLogout = () => async (dispatch) => {
  try {
    localStorage.clear();
    localStorage.removeItem("persist:root");
    await dispatch({
      type: "LOGOUT",
      payload: {},
    });
    return true;
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
  // try {
  //   const resp = await callBackend("get", `procedures/fetchall`);
  //   console.log(resp.result);
  //   dispatch({
  //     type: "GET_DOCUMENTS",
  //     payload: resp.result,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    let config = {
      method: "get",
      url: `${baseUrl}/procedures/fetchall`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log(data);
    console.log("Procedure : ", data.data);

    await dispatch({
      type: "GET_DOCUMENTS",
      payload: data.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// export const saveDocument = (formData) => async (dispatch) => {
//   try {
//     let config = {
//       method: "post",
//       url: `${baseUrl}/documents/savedocument`,
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//       data: formData,
//     };

//     const { data } = await axios(config);
//     console.log("UPLOAD DATA", data);
//     dispatch(openSnackBar(data?.message, "success"));
//   } catch (e) {
//     console.log(e);
//   }
// };

// Doc Generator

export const deleteProcedure = (procedureId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/docgen/deleteproc/${procedureId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Procedure Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
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
    if (resp?.data.message === "headings and procedure added successfully") {
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

export const editDocument = (formData, procedureId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/docgen/editheadings/${procedureId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };

    console.log(config);

    const resp = await axios(config);
    console.log(resp);
    if (resp?.data.message === "doc headings updated successfully") {
      dispatch(openSnackBar("document successfully edited", "success"));
      return true;
    } else {
      dispatch(openSnackBar(resp?.data.message, "error"));
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export const editDocumentProcedureDetails =
  (formData, procedureId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/procedures/editprocedure/${procedureId}`,
        headers: {
          "content-type": "application/json",
        },
        data: formData,
      };

      console.log(config);

      const resp = await axios(config);
      console.log(resp);
      if (resp) {
        await dispatch(editDocument(formData, procedureId));
      }
      if (resp?.data.message === "Procedure updated successfully") {
        dispatch(openSnackBar("Procedure updated successfully", "success"));
        return true;
      } else {
        dispatch(openSnackBar(resp?.data.message, "error"));
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const saveProcedureDocument =
  (formData, procedureId) => async (dispatch) => {
    try {
      let config = {
        method: "post",
        url: `${baseUrl}/docgen/manualform/saveform/${procedureId}`,
        headers: {
          "content-type": "application/json",
        },
        data: formData,
      };
      console.log(formData);
      const data = await axios(config);
      console.log("UPLOAD DATA", data);
      dispatch(openSnackBar(data?.data?.message, "success"));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

export const editProcedureDocument =
  (formData, procedureId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/docgen/manualform/editform/${procedureId}`,
        headers: {
          "content-type": "application/json",
        },
        data: formData,
      };
      console.log(formData);
      const data = await axios(config);
      console.log("UPLOAD DATA", data);
      dispatch(openSnackBar(data?.data?.message, "success"));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

export const fetchProcedureHeadings = (procedureId) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/docgen/fetchheadings/${procedureId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Document Procedure Headings", data);
    // dispatch(openSnackBar(data?.data?.message, "success"));
    dispatch({
      type: "GET_PROCEDURE_HEADINGS",
      payload: data.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addSectionDocumentHeading =
  (heading, procedureId, sections) => async (dispatch) => {
    try {
      let config = {
        method: "POST",
        url: `${baseUrl}/docgen/addsections/${procedureId}`,
        headers: {
          "content-type": "application/json",
        },
        data: { formTitles: sections, documentHeading: heading },
      };
      console.log(config);
      const resp = await axios(config);
      console.log(resp);
      if (resp?.data.message === "titles added successfully") {
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

export const editSectionDocumentHeading =
  (sectionHeadingId, sections) => async (dispatch) => {
    try {
      let config = {
        method: "PUT",
        url: `${baseUrl}/docgen/editsectiontitle/${sectionHeadingId}`,
        headers: {
          "content-type": "application/json",
        },
        data: { title: sections },
      };
      console.log(config);
      const resp = await axios(config);
      console.log(resp);
      if (resp?.data.message === "Section title updated successfully") {
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

export const deleteSectionDocumentHeading = (sectionId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/docgen/deleteform/${sectionId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("section Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const saveSubheadingDocument =
  (formData, subheadingId) => async (dispatch) => {
    try {
      let config = {
        method: "post",
        url: `${baseUrl}/docgen/savedocument/${subheadingId}`,
        headers: {
          "content-type": "application/json",
        },
        data: { formData: formData },
      };
      console.log(formData);
      const data = await axios(config);
      console.log("Form Saved", data);
      dispatch(openSnackBar(data?.data?.message, "success"));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

export const editSubheadingDocument =
  (formData, subheadingId) => async (dispatch) => {
    try {
      let config = {
        method: "post",
        url: `${baseUrl}/docgen/savedocument/${subheadingId}`,
        headers: {
          "content-type": "application/json",
        },
        data: { formData: formData },
      };
      console.log(formData);
      const data = await axios(config);
      console.log("Form Saved", data);
      dispatch(openSnackBar(data?.data?.message, "success"));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

//Doc Generator

// Knowlege hub law, catergory

export const getDataTree = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/datatree`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("DataTree : ", data.data.data);

    await dispatch({
      type: "GET_DATA_TREE",
      payload: data.data.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addCategory = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/knowledgecentre/addcategory`,
      headers: {
        "content-type": "application/json",
      },
      data: { category: formData },
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Category", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteCategory = (categoryid) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/knowledgecentre/deletecategory/${categoryid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Category Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addContentType = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      // url: `${baseUrl}/knowledgecentre/addcategory`, //Change this api to addDynamicCollectionTab
      url: `${baseUrl}/contenttype/addContentType`,
      headers: {
        "content-type": "application/json",
      },
      data: { contenttype_name: formData },
    };
    console.log(formData);
    const data = await axios(config);
    console.log("ContentType", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
    return data;
  } catch (e) {
    console.log(e);
    dispatch(
      openSnackBar(e?.response?.data?.message || "somthing went wrong", "error")
    );
  }
};

export const deleteContentType = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/contenttype/deleteContentType`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("ContentType Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
    return data;
  } catch (e) {
    console.log(e);
    dispatch(
      openSnackBar(
        e?.response?.data?.NativeError || "somthing went wrong",
        "error"
      )
    );
  }
};

export const fetchContentType = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/contenttype/fetchContentTypes`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("ContentTypes : ", data.data.result);
    dispatch({
      type: "GET_ALLCONTENTTYPE",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addContentTypeItem = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/contenttype/addContentTypeItem`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Dynamic Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchContentTypeItem = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/contenttype/fetchContentTypeItems`,
      headers: {
        "content-type": "application/json",
      },
      params: { contenttype_name: formData },
    };
    console.log({ contenttype_name: formData });
    const data = await axios(config);
    console.log(data);
    return data;

    // if (data) {
    //   await dispatch({
    //     type: "GET_CONTENTTYPEITEM_BY_CONTENTTYPE",
    //     payload: data.data.result,
    //   });
    // }
  } catch (e) {
    console.log(e);
  }
};

export const deleteContentTypeItem = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/contenttype/deleteContentTypeItem`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    const data = await axios(config);
    console.log("Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const updateContentTypeItem = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/contenttype/updateContentTypeItemById`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Updated item", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const addAct = (formData, categoryId) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/knowledgecentre/addact/${categoryId}`,
      headers: {
        "content-type": "application/json",
      },
      data: { act: formData },
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Act", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteAct = (actid) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/knowledgecentre/deleteact/${actid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Act Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const editAct = (formData, actid) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/knowledgecentre/editact/${actid}`,
      headers: {
        "content-type": "application/json",
      },
      data: { act: formData },
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Act Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const addChapter = (formData, actid) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/knowledgecentre/addchapter/${actid}`,
      headers: {
        "content-type": "application/json",
      },
      data: { chapter: formData },
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Chapter Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editChapter = (formData, actid) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/knowledgecentre/editchapter/${actid}`,
      headers: {
        "content-type": "application/json",
      },
      data: { chapter: formData },
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Chapter Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteChapter = (chapterid) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/knowledgecentre/deletechapter/${chapterid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Chapter Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const addSection = (formData, chapterid) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/knowledgecentre/addsection/${chapterid}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Section Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteSection = (sectionId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/knowledgecentre/deletesection/${sectionId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Section Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editSection = (formData, sectionId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/knowledgecentre/editsection/${sectionId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Section Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editSubSection = (formData, subsectionId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/knowledgecentre/editsubsection/${subsectionId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Sub-Section Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteSubSection = (subsectionId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/knowledgecentre/deletesubsection/${subsectionId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("SubSection Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const addSubSection = (formData, sectionId) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/knowledgecentre/addsubsection/${sectionId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Section Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchRules = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmsrules/fetchrules`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Rule : ", data.data.result);

    await dispatch({
      type: "GET_RULES",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addRule = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmsrules/addrule`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Rule Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const addSubRule = (formData, ruleId) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmsrules/addsubrule/${ruleId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Sub-rule Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editSubRule = (formData, subruleId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/cmsrules/editsubrule/${subruleId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(subruleId);
    const data = await axios(config);
    console.log("Sub-Rule Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteSubRule = (subruleId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmsrules/deletesubrule/${subruleId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(subruleId);
    const data = await axios(config);
    console.log("Sub-Rule Delete", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editRule = (formData, ruleId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/cmsrules/editrule/${ruleId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(ruleId);
    const data = await axios(config);
    console.log("Rule Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteRule = (ruleId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmsrules/deleterule/${ruleId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Rule Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const addNotification = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmsnotifications/addnotifications`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Notification Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editNotification =
  (formData, notificationId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/cmsnotifications/editnotification/${notificationId}`,
        headers: {
          "content-type": "application/json",
        },
        data: formData,
      };
      console.log(formData);
      console.log(notificationId);
      const data = await axios(config);
      console.log("Notification Edited", data);
      dispatch(openSnackBar(data?.data?.message, "success"));
    } catch (e) {
      console.log(e);
    }
  };

export const deleteNotification = (notificationId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmsnotifications/deletenotification/${notificationId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Notification Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchNotification = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmsnotifications/fetchnotifications`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Notification : ", data.data.result);

    dispatch({
      type: "GET_NOTIFICATIONS",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addCircular = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmscirculars/addcircular`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Circular Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editCircular = (formData, circularId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/cmscirculars/editcircular/${circularId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Circular Edited", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteCircular = (circularId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmscirculars/deletecircular/${circularId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Circular Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};
export const fetchCirculars = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmscirculars/fetchcirculars`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Circular : ", data.data.result);

    dispatch({
      type: "GET_CIRCULARS",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addArticle = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmsarticles/addarticle`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Article Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editArticle = (formData, articleId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/cmsarticles/editarticle/${articleId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Article Updated", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteArticle = (articleId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmsarticles/deletearticle/${articleId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Article Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchArticles = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmsarticles/fetcharticles`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Articles : ", data.data.result);

    dispatch({
      type: "GET_ARTICLES",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchNews = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmsnews/fetchnews`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("News : ", data.data.result);

    dispatch({
      type: "GET_NEWS",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addNews = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmsnews/addnews`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("News Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editNews = (formData, newsId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/cmsnews/editnews/${newsId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("News Updated", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const deleteNews = (newsId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmsnews/deletenews/${newsId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("News Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchPresentation = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmspresentations/fetchpresentations`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Presentation : ", data.data.result);

    dispatch({
      type: "GET_PRESENTATION",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addPresentation = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/cmspresentations/addpresentation`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);
    const data = await axios(config);
    console.log("Presentation Added", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const editPresentation =
  (formData, presentationId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/cmspresentations/editpresentation/${presentationId}`,
        headers: {
          "content-type": "application/json",
        },
        data: formData,
      };
      console.log(formData);
      const data = await axios(config);
      console.log("Presentation Updated", data);
      dispatch(openSnackBar(data?.data?.message, "success"));
    } catch (e) {
      console.log(e);
    }
  };

export const deletePresentation = (presentationId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/cmspresentations/deletepresentation/${presentationId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Presentation Deleted", data);
    dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchCategory = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchcategories`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Category : ", data.data.result);

    const catWiseAct = [];

    await Promise.all(
      data.data.result.map(async (item) => {
        const category = item.category;
        const categoryId = item._id;
        console.log(item.category);
        const acts = await axios.get(
          `${baseUrl}/knowledgecentre/fetchact/${item._id}`
        );
        console.log(acts);
        catWiseAct.push({
          category: category,
          _id: categoryId,
          acts: acts.data.result,
        });
        console.log(catWiseAct);
      })
    );
    console.log(catWiseAct);
    console.log(
      catWiseAct.sort((a, b) => a.category.localeCompare(b.category))
    );
    dispatch({
      type: "GET_CATEGORY",
      payload: catWiseAct.sort(),
    });
    // dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchAllCategory = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchcategories`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Category : ", data.data.result);
    dispatch({
      type: "GET_ALLCATEGORY",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchActByCategory = (categoryId) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchact/${categoryId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Acts : ", data.data.result);
    dispatch({
      type: "GET_ACTS_BY_CATEGORY",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchChapters = (act) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_CHAPTERS",
      payload: [],
    });
    dispatch({
      type: "LOADING",
      payload: true,
    });
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchchapter/${act}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Chapters : ", data.data.result);

    dispatch({
      type: "GET_CHAPTERS",
      payload: data.data.result,
    });
    dispatch({
      type: "LOADING",
      payload: false,
    });
    // dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
    dispatch({
      type: "LOADING",
      payload: false,
    });
  }
};

export const fetchSections = (chapterid) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchsection/${chapterid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Sections : ", data.data.result);

    dispatch({
      type: "GET_SECTIONS",
      payload: data.data.result,
    });
    // dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchSubSections = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchsubsections`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("SubSections : ", data.data.result);

    dispatch({
      type: "GET_SUBSECTIONS",
      payload: data.data.result,
    });
    // dispatch(openSnackBar(data?.data?.message, "success"));
  } catch (e) {
    console.log(e);
  }
};

export const fetchSectionsByChapterId = (chapterid) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchsection/${chapterid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("SectionsBySectionId : ", data.data.result);
    await dispatch({
      type: "GET_SECTIONSBYSECTIONID",
      payload: data.data.result,
    });
    return data.data.result;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSubSectionsBySectionId = (sectionid) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchsubsection/${sectionid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("SubSectionsBySectionId : ", data.data.result);

    dispatch({
      type: "GET_SUBSECTIONSBYSECTIONID",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchAllChapters = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchchapters`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("chapters : ", data.data.result);

    dispatch({
      type: "GET_ALLCHAPTERS",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchAllSections = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchsections`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Sections : ", data.data.result);

    dispatch({
      type: "GET_ALLSECTIONS",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchRulesBySubSection = (subsectionid) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/cmsrules/fetchrules/${subsectionid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Rule : ", data.data.result);

    dispatch({
      type: "GET_RULES_BY_SUB_SECTION",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchNotificationsBySubSection =
  (subsectionid) => async (dispatch) => {
    try {
      let config = {
        method: "get",
        url: `${baseUrl}/cmsnotifications/fetchnotifications/${subsectionid}`,
        headers: {
          "content-type": "application/json",
        },
      };
      const data = await axios(config);
      console.log("Notification : ", data.data.result);

      dispatch({
        type: "GET_NOTIFICATIONS_BY_SUB_SECTION",
        payload: data.data.result,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const fetchCircularsBySubSection =
  (subsectionid) => async (dispatch) => {
    try {
      let config = {
        method: "get",
        url: `${baseUrl}/cmscirculars/fetchcirculars/${subsectionid}`,
        headers: {
          "content-type": "application/json",
        },
      };
      const data = await axios(config);
      console.log("Circular : ", data.data.result);

      dispatch({
        type: "GET_CIRCULARS_BY_SUB_SECTION",
        payload: data.data.result,
      });
    } catch (e) {
      console.log(e);
    }
  };

// Knowlege hub law, catergory

// Calculators ..........

export const fetchAddedCalculators = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/calculators/fetchcalculators`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("calculators : ", data.data.result);

    dispatch({
      type: "GET_ALL_CALCULATORS",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const fetchAddedCalculatorsById = (id) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/calculators/fetchcalculatorbyid/${id}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("calculator : ", data.data.result);

    dispatch({
      type: "GET_ALL_CALCULATORS_BY_ID",
      payload: data.data.result,
    });
  } catch (e) {
    console.log(e);
  }
};

export const editAddedCalculatorsById =
  (calculatorData, id) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/calculators/editmultiformulacalc/${id}`,
        headers: {
          "content-type": "application/json",
        },
        data: calculatorData,
      };
      console.log(calculatorData);
      const data = await axios(config);
      console.log("calculator edited : ", data.data.result);
      dispatch(openSnackBar("calculator updated successfully", "success"));
      return true;
    } catch (e) {
      console.log(e);
    }
  };

export const deleteAddedCalculatorsById = (id) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/calculators/delete/${id}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("calculator deleted : ", data.data.result);
    dispatch(openSnackBar(data?.data?.message, "success"));
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const DuplicateProcedure = (procedureId) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/docgen/duplicateprocedure/${procedureId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(procedureId);
    const data = await axios(config);
    console.log("procedure duplicated : ", data);
    await dispatch(openSnackBar(data?.data?.message, "success"));
    return true;
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

export const AddSimpleCalculator = (calculatorData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/calculators/addmultiformulacalc`,
      headers: {
        "content-type": "application/json",
      },
      data: calculatorData,
    };
    console.log(calculatorData);
    const data = await axios(config);
    console.log("calculator Added : ", data);
    dispatch(
      openSnackBar(
        data?.data?.message || "Calculator added successfully",
        "success"
      )
    );
    return true;
  } catch (e) {
    dispatch(openSnackBar("some error occured", "error"));
    console.log(e);
  }
};

export const getTextAnalysis = (id) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/knowledgecentre/fetchtextanalysis/${id}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("TextAnalysis : ", data);

    if (data?.data?.result) {
      let last = data?.data?.result[data?.data?.result.length - 1];
      console.log(last);
      console.log(last.type);
      await dispatch({
        type: "GET_TEXT_ANALYSIS_TYPE",
        payload: last.type,
      });
    } else {
      await dispatch({
        type: "GET_TEXT_ANALYSIS_TYPE",
        payload: "",
      });
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

// generate procedure

export const CreateGenerateProcedure = (procedureData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/procedures/createprocedure`,
      headers: {
        "content-type": "application/json",
      },
      data: procedureData,
    };
    console.log(procedureData);
    const data = await axios(config);
    console.log("proceduregenerated Added : ", data);
    dispatch(
      openSnackBar(
        data?.data?.message || "Procedure created successfully",
        "success"
      )
    );
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const editGenerateProcedure =
  (formData, procedureId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/procedures/editprocedure/${procedureId}`,
        headers: {
          "content-type": "application/json",
        },
        data: formData,
      };

      console.log(config);

      const resp = await axios(config);
      console.log(resp);
      if (resp?.data.message === "Procedure updated successfully") {
        dispatch(openSnackBar("Procedure updated successfully", "success"));
        return true;
      } else {
        dispatch(openSnackBar(resp?.data.message, "error"));
        return false;
      }
    } catch (e) {
      console.log(e);
    }
  };

export const fetchGenerateProcedure = (procedureData) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/procedures/fetchall`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log(data);
    console.log("Procedure : ", data.data);

    await dispatch({
      type: "GET_PROCEDURES",
      payload: data.data,
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const CreateProcess = (processData, procedureId) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/processes/createprocess`,
      headers: {
        "content-type": "application/json",
      },
      data: processData,
    };
    console.log(processData);
    const data = await axios(config);
    console.log("process Added : ", data.data);
    console.log(data.data._id);
    if (data) {
      const processId = data.data._id;
      let config2 = {
        method: "post",
        url: `${baseUrl}/procedures/addprocesstoprocedure/${procedureId}`,
        headers: {
          "content-type": "application/json",
        },
        data: {
          processidarr: [processId],
        },
      };
      console.log(config2);
      const data2 = await axios(config2);
      console.log("process assigned to procedure : ", data2);
      dispatch(
        openSnackBar(
          data2?.data?.message || "process ceated successfully",
          "success"
        )
      );
      return true;
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchProcessesByProcedure = (procedureId) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/procedures/fetchprocessesofprocedure/${procedureId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log(data);
    console.log("Specific Processes By Procedure : ", data.data);

    await dispatch({
      type: "GET_PROCESSES_BY_PROCEDUREID",
      payload: data.data,
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const deleteProcess = (processId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/processes/deleteprocess/${processId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Process Deleted", data);
    dispatch(openSnackBar(data?.data?.message || "Process deleted", "success"));
  } catch (e) {
    console.log(e);
  }
};

export const updateProcess = (formData, processId) => async (dispatch) => {
  try {
    let config = {
      method: "put",
      url: `${baseUrl}/processes/updateprocess/${processId}`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(config);
    const data = await axios(config);
    console.log(data);
    dispatch(openSnackBar("Process updated successfully", "success"));
  } catch (e) {
    console.log(e);
  }
};

// Genearte Tempplates

export const addTemplate = (formData) => async (dispatch) => {
  try {
    let config = {
      method: "post",
      url: `${baseUrl}/templates/createtemplate`,
      headers: {
        "content-type": "application/json",
      },
      data: formData,
    };
    console.log(formData);

    const resp = await axios(config);
    console.log(resp);
    dispatch(openSnackBar("template successfully created", "success"));
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const getAllTemplates = () => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/templates/fetchalltemplates`,
      headers: {
        "content-type": "application/json",
      },
    };
    const resp = await axios(config);
    console.log(resp.data);

    await dispatch({
      type: "GET_TEMPLATES",
      payload: resp.data,
    });

    return true;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTemplate = (templateId) => async (dispatch) => {
  try {
    let config = {
      method: "delete",
      url: `${baseUrl}/templates/deletetemplate/${templateId}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const data = await axios(config);
    console.log("Template Deleted", data);
    dispatch(
      openSnackBar(
        data?.data?.message || "Template deleted successfully",
        "success"
      )
    );
  } catch (e) {
    console.log(e);
  }
};

export const addDocumentTemplate =
  (docData, templateId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/templates/updatetemplatewithtemplateformdata/${templateId}`,
        headers: {
          "content-type": "application/json",
        },
        data: docData,
      };
      console.log(docData);

      const resp = await axios(config);
      console.log(resp);
      dispatch(openSnackBar("document successfully added", "success"));
      return true;
    } catch (e) {
      console.log(e);
    }
  };

export const addSectionToTemplateHeadings =
  (sectionData, templateId) => async (dispatch) => {
    try {
      let config = {
        method: "put",
        url: `${baseUrl}/templates/updatetemplatewithsection/${templateId}`,
        headers: {
          "content-type": "application/json",
        },
        data: sectionData,
      };
      console.log(sectionData);

      const resp = await axios(config);
      console.log(resp);
      dispatch(openSnackBar("section successfully added", "success"));
      return true;
    } catch (e) {
      console.log(e);
    }
  };

export const fetchtemplatesforprocesses = (law, act) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/templates/fetchtemplatesforprocesses`,
      headers: {
        "content-type": "application/json",
      },
      params: {
        law: law,
        act: act,
      },
    };
    const resp = await axios(config);
    console.log(resp.data);

    await dispatch({
      type: "GET_TEMPLATES_FOR_PROCESS",
      payload: resp.data,
    });

    return true;
  } catch (e) {
    console.log(e);
  }
};

export const fetchtemplatebyid = (templateid) => async (dispatch) => {
  try {
    let config = {
      method: "get",
      url: `${baseUrl}/templates/fetchtemplate/${templateid}`,
      headers: {
        "content-type": "application/json",
      },
    };
    const resp = await axios(config);
    console.log(resp.data.result);

    await dispatch({
      type: "GET_TEMPLATES_BY_ID",
      payload: resp.data.result,
    });

    return resp.data.result;
  } catch (e) {
    console.log(e);
  }
};
