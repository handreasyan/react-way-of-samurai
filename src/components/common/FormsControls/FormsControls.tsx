import styles from './FormsControl.module.css'
import React from "react"
import {WrappedFieldProps} from "redux-form/lib/Field"
import {Field} from "redux-form";

type OwnPropsType = {
  placeholder?: string
  type?: string
}

export type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
}

export type LoginFromValuesTypeKeys = getStringKeys<LoginFormValuesType>

const ElementHOC = (Element: string | any): React.FC<WrappedFieldProps & OwnPropsType> => {

  return ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
      <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <Element {...input} {...props} />
        {hasError && <span> {meta.error} </span>}
      </div>
    );

  }

};


export const Textarea = ElementHOC("textarea");
export const Input = ElementHOC("input");


//es functione menak ogtagorcumem Login.tsx faylum , u endex grvaca te inji hamarem sa sarqel
export function ReturnField<FormKeysType extends string>( placeholder: string, component: React.FC<WrappedFieldProps>,
                            name: FormKeysType, validate: any[], type = 'text',className?:string) {
  return (
    <div>
      <Field placeholder={placeholder} component={component} name={name} validate={validate} type={type} className={className}/>
    </div>
  )
}

export type getStringKeys<T> = Extract<keyof T, string>

