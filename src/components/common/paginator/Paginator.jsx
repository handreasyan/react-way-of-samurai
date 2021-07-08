import React from 'react';
import styles from "./paginator.module.css";

export const Paginator = ({totalUsersCount,pageSize,currentPage,onPageChanged}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  // vor ejis vra shat spaner chereva minjev klucenq sra xnidre

  const spans = pages.map((p) => {
    return (
      <span
        key={p}
        className={
          styles.paginationSpan +
          " " +
          (currentPage === p && styles.selectedPage)
        }
        onClick={() => onPageChanged(p)}
      >
        {p}
      </span>
    );
  });
  const spansShowFunc = () => {
    let newArr = [];
    if (spans.length > 10) {
      for (let i = 10; i < 110; i++) {
        newArr.push(spans[i]);
      }
    }
    return newArr;
  };
  return (
    <div>
      {spansShowFunc()}
    </div>
  );
};

export default Paginator;