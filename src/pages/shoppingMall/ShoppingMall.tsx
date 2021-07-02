import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCategoriesDataActionCreator } from "../../redux/shoppingMall/fetchCategoriesActions";
import { RootState } from "../../redux/store";
import "./shoppingMall.css";
import { EmComponent } from "./EmComponent";

export const ShoppingMall: React.FC = () => {
  let categories: any = useSelector((s: RootState) => s.categories);
  let loading = categories.loading;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in shoppngMall.tsx file ");
    dispatch(fetchCategoriesDataActionCreator());
  }, []);

  const onMouseOverHandler = (e) => {
    //e.target 只是触发当前时间的对象
    // 也可能是h3 也可能是 item-list
    console.log(e.currentTarget);
    //if(e.target.className === e.currentTarget.className ){
      const sortList = document.getElementsByClassName("all-sort-list")[0];
      const sLTop = sortList.getBoundingClientRect().top;
      const targetTop = e.currentTarget.getBoundingClientRect().top;
      //e.currentTarget.childNode.filter(node => node.className === "item-list")
      // childNode 虽然数组 但是用不了 filter,
      //但是 我们可以用call 或者apply 或者bind 之类方法来解决
      //调用下call 的用法
      let itemList =  Array.prototype.filter.call(e.currentTarget.childNodes,node => node.className ==="item-list"); //filter(node => node.className ==="item-list");
      itemList[0].style.display = "block";
      debugger;
      itemList[0].style.top =  (targetTop - sLTop) + "px";
      //itemList[0].style.setProperty("top", (targetTop - sLTop) + "px");

    //}
  };

  const onMouseOutHandler = (e) => {
    console.log(e.currentTarget);
    //if(e.target.className === e.currentTarget.className){
      let itemList =  Array.prototype.filter.call(e.currentTarget.childNodes,node => node.className ==="item-list");
      itemList[0].style.display = "none"
    //}
  }
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
            : categories.categoryList.data.map((category, index) => {
                return (
                  <div
                    key={index}
                    className="item"
                    onMouseOver={onMouseOverHandler}
                    onMouseOut={onMouseOutHandler}
                  >
                    <h3>
                      <span>·</span>
                      <a href="##">{category.categoryName}</a>
                    </h3>
                    <div className="item-list">
                      <div className="subitem">
                        {category.secondLevelCategoryVOS.map(
                          (vos2, secondIdx) => {
                            return (
                              <dl className="fore1" key={secondIdx}>
                                <dt>{vos2.categoryName}</dt>
                                <dd>
                                  {vos2.thirdLevelCategoryVOS.map(
                                    (vos3, thirdIdx) => {
                                      return (
                                        <EmComponent
                                          idx={thirdIdx}
                                          categoryId={vos3.categoryId}
                                          categoryName={vos3.categoryName}
                                        ></EmComponent>
                                      );
                                    }
                                  )}
                                </dd>
                              </dl>
                            );
                          }
                        )}
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
