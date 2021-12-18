import React from "react";

interface ifProps {
  categoryName: string;
  idx: number;
  categoryId: number;
}
export const EmComponent: React.FC<ifProps> = ({
  categoryName,
  categoryId,
  idx,
}) => {
  // return (
  // <em key={idx}>
  //   <a className={idx%2===0?'_hidden':'unhidden'} href={`http://localhost:8081/search?goodsCategoryId=${categoryId}`}>{categoryName}</a>
  // </em>
  return true ? (
    <em key={idx}>
      <a
        href={`http://localhost:8081/search?goodsCategoryId=${categoryId}`}
      >
        {categoryName}
      </a>
    </em>
  ) : null;
};
