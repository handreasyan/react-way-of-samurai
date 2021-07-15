export type FiledValidatorType = (value:string)=> string | undefined

export const required:FiledValidatorType =( value) => {
  if(value) return  undefined

  return 'Field is required';
}

export const maxLengthCreator = (maxLength:number):FiledValidatorType => (value:string) => {
  if(value.length > maxLength) return  "Max Length is "+maxLength+" symbols"

  return undefined;
}


