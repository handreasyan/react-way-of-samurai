export const required = value => {
  if(value) return  undefined

  return 'Field is required';
}

export const maxLengthCreator = (maxLength) => (value) => {
  if(value.length > maxLength) return  "Max Length is "+maxLength+" symbols"

  return undefined;
}


// import styles from './FormsControl.module.css'
// import React from "react";
//
// const Element = (Element) => ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div className={ styles.formControl + " " + (hasError ? styles.error : "") }>
//       <Element {...input} {...props}  type={props.type ? props.type : ''}/>
//       { hasError && <span> { meta.error } </span> }
//     </div>
//   );
// };
//
//
// export const Textarea = Element("textarea");
// export const Input = Element("input");
//
//

