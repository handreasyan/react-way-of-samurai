import React, {ReactNode, useState} from 'react';
import styles from "./paginator.module.css";

type PropsType = {
  totalUsersCount:number,
  pageSize:number,
  currentPage:number,
  onPageChanged:(pageNumber:number)=>void
}

export const Paginator:React.FC<PropsType> = ({totalUsersCount,pageSize,currentPage,onPageChanged}:PropsType) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const paginatorPagesCount = 10;

  const pages:Array<ReactNode> = Array(pagesCount).fill('').map((_,i) => {
    return (
      <span key={i} onClick={() => onPageChanged(i+1)}
        className={`${styles.paginationSpan} ${currentPage === (i+1) && styles.selectedPage}`}
      > { (i+1) } </span>
    );
  });

  const showLessSpans = (num:number) => pages.slice(num,num + 10)
  const nextPage = () => {
    const changedPost = lastPage + paginatorPagesCount + 1
    onPageChanged(changedPost)
    setLastPage(p => p + paginatorPagesCount)
  }
  const prevPage = () => {
    const changedPost = lastPage + paginatorPagesCount + 1
    onPageChanged(changedPost)
    setLastPage(p => p - paginatorPagesCount)
  }
  const [lastPage,setLastPage] = useState(0);

  return (
    <div className={styles.paginator}>
      {lastPage > (paginatorPagesCount - 1) ? <button onClick={prevPage}>PREVIOUS</button> : ''}
      {showLessSpans(lastPage)}
      {lastPage < pages.length - paginatorPagesCount ? <button onClick={nextPage}>NEXT</button> : ''}
    </div>
  );
};

export default Paginator;