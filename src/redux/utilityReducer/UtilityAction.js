export const openSnackBar = (msg, type) => (dispatch) => {
  dispatch({
    type: "OPEN_TOAST",
    payload: {
      msg: msg,
      type: type,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLOSE_TOAST",
    });
  }, 3000);
};
