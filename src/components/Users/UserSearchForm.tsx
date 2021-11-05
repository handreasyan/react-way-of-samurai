import {Field, Form, Formik} from "formik";


const usersSearchFormValidate = (values: any) => {
  const errors = {}

  return errors
}

type UsersSearchFormObjectType = {
  term:string
}


const UserSearchForm = () => {

  const handleSubmit = (values:UsersSearchFormObjectType, { setSubmitting }:{setSubmitting:(isSubmitting:boolean)=>void}) => {

  }

  return (
    <div>
      <Formik
        initialValues={{ term: '' }}
        validate={usersSearchFormValidate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserSearchForm