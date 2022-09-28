const initialStore = {
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  id: null,
  name: null,
  email: null,
  listOfAdmins: [],
  listOfSubAdmins: [],
};

const superAdminReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
        id: null,
        name: null,
        email: null,
      };
    case "GET_ADMINS":
      return {
        ...state,
        listOfAdmins: action.payload,
      };
    case "GET_SUB_ADMINS":
      return {
        ...state,
        listOfSubAdmins: action.payload,
      };
    default:
      return state;
  }
};

export default superAdminReducer;
