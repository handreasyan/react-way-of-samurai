import Paginator from '../common/paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'
import { Formik, Field, Form } from 'formik'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (id: number) => void
  follow: (id: number) => void
}

let Users = ({
  users,
  followingInProgress,
  unfollow,
  follow,
  ...paginatorProps
}: PropsType) => {
  return (
    <div>
      <UserSearchForm />

      <Paginator {...paginatorProps} />
      {users.map((user: UserType) => (
        <User
          key={user.id}
          user={user}
          followingInProgress={followingInProgress}
          unfollow={unfollow}
          follow={follow}
        />
      ))}
    </div>
  )
}

const usersSearchFormValidate = (values: any) => {
  const errors = {}

  return errors
}

// current Lesson _  Formik Lib =>  https://youtu.be/2hMbJmIqpkc?list=PLcvhF2Wqh7DM3z1XqMw0kPuxpbyMo3HvN&t=941

const UserSearchForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 400)
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

export default Users
