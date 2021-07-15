import React from 'react';
import Preloader from "../components/common/Preloader/loader";

const withSuspense = (Component) => {
  return (props) => {
    return (
      <React.Suspense fallback={<Preloader />}>
        <Component {...props}/>
      </React.Suspense>
    )
  };
};

export default withSuspense;


