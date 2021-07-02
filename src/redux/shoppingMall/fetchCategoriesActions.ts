import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

// FETCH_CATEGORIES_START 用来显示loading的icon
// 加载中时显示loading
export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START"; // 正在调用推荐信息api

export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"; // 推荐信息api调用成功
export const FETCH_CATEGORIES_FAIL = "FETCH_CATEGORIES_FAIL"; // 推荐信息api调用失败

interface FetchCategoriesSuccessAction {
  type: typeof FETCH_CATEGORIES_SUCCESS;
  payload: any;
}

interface FetchCategoriesFailAction {
  type: typeof FETCH_CATEGORIES_FAIL;
  payload: any;
}

interface FetchCategoriesStartAction {
  type: typeof FETCH_CATEGORIES_START;
}

export const fetchCategoriesStartActionCreator =
  (): FetchCategoriesStartAction => {
    return {
      type: FETCH_CATEGORIES_START,
    };
  };

export const fetchCategoriesSuccessActionCreator = (
  data
): FetchCategoriesSuccessAction => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: data,
  };
};

export const fetchCategoriesFailActionCreator = (
  error
): FetchCategoriesFailAction => {
  return {
    type: FETCH_CATEGORIES_FAIL,
    payload: error,
  };
};
export type CategoriesAction =
  | FetchCategoriesStartAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailAction; 


// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
export const fetchCategoriesDataActionCreator = (): ThunkAction<
  void,
  RootState,
  unknown,
  CategoriesAction
> => async (dispatch, getState) => {
  dispatch(fetchCategoriesStartActionCreator());
  try {
    const { data } = await axios.get(
      "http://localhost:8081/categories"
    );
    dispatch(fetchCategoriesSuccessActionCreator(data));
  } catch (error) {
    dispatch(fetchCategoriesFailActionCreator(error.message));
  }
};