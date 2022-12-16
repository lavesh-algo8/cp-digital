const initialStore = {
  toast: false,
  msg: "",
  type: "",
};

const utilityReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "OPEN_TOAST":
      return {
        ...state,
        toast: true,
        msg: action.payload.msg,
        type: action.payload.type,
      };
    case "CLOSE_TOAST":
      return {
        ...state,
        toast: false,
        msg: "",
        type: "",
      };

    default:
      return state;
  }
};

export default utilityReducer;
