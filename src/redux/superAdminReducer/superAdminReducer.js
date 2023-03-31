const initialStore = {
  loading: false,
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  id: null,
  name: null,
  email: null,
  listOfAdmins: [],
  listOfSubAdmins: [],
  dataTree: [],
  listOfDocuments: [],
  selectedDocument: {},
  selectedSubHeadingDocument: {},
  categoryList: [],
  contenttypeList: [],
  categoryAllList: [],
  actsByCategoryList: [],
  chapterList: [],
  allChapterList: [],
  sectionsList: [],
  subsectionsList: [],
  sectionsbychapterList: [],
  rulesList: [],
  notificationsList: [],
  circularsList: [],
  rulesListBySubSections: [],
  notificationsListBySubSection: [],
  circularsListBySubSection: [],
  articlesList: [],
  newsList: [],
  presentationList: [],
  procedureHeadingsList: [],
  addedCalculatorList: [],
  addedCalculatorsById: [],
  formulaAdded: {},
  textAnalysisType: "",
};

const superAdminReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
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
      Object.keys(state).forEach((key) => {
        localStorage.removeItem(`persist:${key}`);
      });
      state = undefined;
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

    case "GET_DATA_TREE":
      return {
        ...state,
        dataTree: action.payload,
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

    case "SET_SELECT_SUB_HEADING_DOCUMENT":
      return {
        ...state,
        selectedSubHeadingDocument: action.payload,
      };

    case "GET_CATEGORY":
      return {
        ...state,
        categoryList: action.payload,
      };

    case "GET_ALLCATEGORY":
      return {
        ...state,
        categoryAllList: action.payload,
      };
      case "GET_ALLCONTENTTYPE":
        return {
          ...state,
          contenttypeList: action.payload,
        };  

    case "GET_ACTS_BY_CATEGORY":
      return {
        ...state,
        actsByCategoryList: action.payload,
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

    case "GET_SUBSECTIONSBYSECTIONID":
      return {
        ...state,
        subsectionsList: action.payload,
      };
    case "GET_SECTIONSBYSECTIONID":
      return {
        ...state,
        sectionsbychapterList: action.payload,
      };

    case "REMOVE_SUBSECTIONSBYSECTIONID":
      return {
        ...state,
        subsectionsList: action.payload,
      };
    case "REMOVE_SECTIONSBYSECTIONID":
      return {
        ...state,
        sectionsbychapterList: action.payload,
      };
    case "GET_ALLCHAPTERS":
      return {
        ...state,
        allChapterList: action.payload,
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

    case "GET_ARTICLES":
      return {
        ...state,
        articlesList: action.payload,
      };

    case "GET_NEWS":
      return {
        ...state,
        newsList: action.payload,
      };

    case "GET_PRESENTATION":
      return {
        ...state,
        presentationList: action.payload,
      };

    case "GET_PROCEDURE_HEADINGS":
      return {
        ...state,
        procedureHeadingsList: action.payload,
      };

    case "GET_ALL_CALCULATORS":
      return {
        ...state,
        addedCalculatorList: action.payload,
      };

    case "GET_ALL_CALCULATORS_BY_ID":
      return {
        ...state,
        addedCalculatorsById: action.payload,
      };

    case "ADD_FORMULA":
      console.log(action.payload);
      return {
        ...state,
        formulaAdded: {
          ...state.formulaAdded,
          [action.payload.forumlaName]: action.payload.formulaText,
        },
      };

    case "REMOVE_FORMULA":
      console.log(action.payload);
      return {
        ...state,
        formulaAdded: {},
      };

    case "GET_TEXT_ANALYSIS_TYPE":
      console.log(action.payload);
      return {
        ...state,
        textAnalysisType: action.payload,
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
