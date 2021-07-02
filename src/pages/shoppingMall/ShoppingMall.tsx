import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCategoriesDataActionCreator } from "../../redux/shoppingMall/fetchCategoriesActions";
import { RootState } from "../../redux/store";
import { CategoriesState } from "../../redux/shoppingMall/fetchCategoriesReducer";

export const ShoppingMall: React.FC = () => {
  let categories: any = useSelector((s: RootState) => s.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in shoppngMall.tsx file ");
    dispatch(fetchCategoriesDataActionCreator());
  }, []);

  //categories.loading = false
  //categories.error = null
  //categories.categoryList ={resultcode,message, data}
  //categories.categoryList.data =[]
  return categories.loading === true ? (
    <h1>"loading"</h1>
  ) : (
    <div>
      <div id="banner">
        <div className="all-sort-list">
          {categories.error != null
            ? "error"
            : categories.categoryList.data.map((category,index) => {
                return (
                  <div key = {index} className="item">
                    <h3>
                      <span>·</span>
                      <a href="##">{category.categoryName}</a>
                    </h3>
                    <div className="item-list">
                      <div className="subitem">
                        <dl className="fore1">
                          <dt>家电</dt>
                          <dd>
                            <em>
                              <a href="/search?goodsCategoryId=30">卷发器</a>
                            </em>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
