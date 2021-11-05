import Paginator from '../common/paginator/Paginator'
import User from './User'
import { UserType } from '../../types/types'
import { Formik, Field, Form } from 'formik'
import UserSearchForm from "./UserSearchForm";

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

export default Users
