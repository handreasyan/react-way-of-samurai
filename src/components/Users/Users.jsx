import Paginator from "../common/paginator/Paginator";
import User from "./User";

let Users = ({users, followingInProgress, unfollow,follow,...paginatorProps}) => {
  return (
    <div>
      <Paginator {...paginatorProps} />
      {users.map((user) => (
        <User key={user.id} user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
      ))}
    </div>
  );
};

export default Users;
