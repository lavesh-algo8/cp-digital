const initialStore = {
  checkedValues: {},
};

const DataTreeReducer = (state = initialStore, action) => {
  switch (action.type) {
    case "SET_CHECKED_VALUES":
      return {
        ...state,
        checkedValues: {
          ...state.checkedValues,
          [action.payload.name]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

export default DataTreeReducer;
