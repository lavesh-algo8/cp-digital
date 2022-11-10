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
  categoryList: [],
  chapterList: [],
  sectionsList: [],
  subsectionsList: [],
  rulesList: [],
  notificationsList: [],
  circularsList: [],
  rulesListBySubSections: [],
  notificationsListBySubSection: [],
  circularsListBySubSection: [],
  procedureHeadingsList: [],
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

    case "GET_CATEGORY":
      return {
        ...state,
        categoryList: action.payload,
      };

    case "GET_CHAPTERS":
      return {
        ...state,
        chapterList: action.payload,
      };
    case "GET_SECTIONS":
      return {
        ...state,
        sectionsList: action.payload,
      };
    case "GET_SUBSECTIONS":
      return {
        ...state,
        subsectionsList: action.payload,
      };
    case "GET_RULES":
      return {
        ...state,
        rulesList: action.payload,
      };
    case "GET_RULES_BY_SUB_SECTION":
      return {
        ...state,
        rulesListBySubSections: action.payload,
      };
    case "GET_NOTIFICATIONS":
      return {
        ...state,
        notificationsList: action.payload,
      };
    case "GET_NOTIFICATIONS_BY_SUB_SECTION":
      return {
        ...state,
        notificationsListBySubSection: action.payload,
      };
    case "GET_CIRCULARS":
      return {
        ...state,
        circularsList: action.payload,
      };
    case "GET_CIRCULARS_BY_SUB_SECTION":
      return {
        ...state,
        circularsListBySubSection: action.payload,
      };

    case "GET_PROCEDURE_HEADINGS":
      return {
        ...state,
        procedureHeadingsList: action.payload,
      };
    // case "UPDATE_DOCUMENT":
    //   let headingList = state?.listOfDocuments?.filter(
    //     (doc) => doc.id === action.payload.doc_id
    //   )[0].headings;

    //   let updatedHeadings = headingList.map((heading) => {
    //     if (heading.id === action.payload.id) {
    //       return {
    //         ...heading,
    //         sections: action.payload.sections,
    //       };
    //     } else {
    //       return heading;
    //     }
    //   });

    //   console.log(updatedHeadings);

    //   return {
    //     ...state,
    //     listOfDocuments: state.listOfDocuments.map((item) =>
    //       item.id === action.payload.doc_id
    //         ? { ...item, headings: updatedHeadings }
    //         : item
    //     ),
    //   };
    default:
      return state;
  }
};
export default superAdminReducer;
