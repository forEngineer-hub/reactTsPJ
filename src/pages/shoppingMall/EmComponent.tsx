import React from "react";

interface ifProps {
    categoryName: string;
    idx: number;
    categoryId: number;
}
export const EmComponent: React.FC<ifProps> = ({categoryName,categoryId,idx}) => {
  return (
    <em key={idx}>
      <a href={`http://localhost:8081/search?goodsCategoryId=${categoryId}`}>{categoryName}</a>
    </em>
  );
};
