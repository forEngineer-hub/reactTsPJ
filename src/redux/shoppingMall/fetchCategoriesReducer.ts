import {
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  CategoriesAction,
} from "./fetchCategoriesActions";

export interface CategoriesState {
  categoryList: {data:[]};
  loading: boolean;
  error: string | null;
}

const defaultState: CategoriesState = {
  loading: true,
  error: null,
  categoryList: {data:[]},
};

export default (state = defaultState, action: CategoriesAction) => {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categoryList: action.payload };
    case FETCH_CATEGORIES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
