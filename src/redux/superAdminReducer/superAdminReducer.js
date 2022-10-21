const initialStore = {
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  id: null,
  name: null,
  email: null,
  listOfAdmins: [],
  listOfSubAdmins: [],
  listOfDocuments: [],
  selectedDocument: {},
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
    case "GET_DOCUMENTS":
      return {
        ...state,
        listOfDocuments: action.payload,
      };
    // case "ADD_DOCUMENTS":
    //   return {
    //     ...state,
    //     listOfDocuments: [...state.listOfDocuments, action.payload],
    //   };
    case "SET_SELECT_DOCUMENT":
      return {
        ...state,
        selectedDocument: action.payload,
      };
    default:
      return state;
  }
};

export default superAdminReducer;
