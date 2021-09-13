import usersReducer, { actions, InitialStateType } from './usersReducer'

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'SomeName',
        followed: false,
        photos: { small: null, large: null },
        status: 'Status 0',
        uniqueUrlName: 'xz',
      },
      {
        id: 1,
        name: 'SomeName',
        followed: false,
        photos: { small: null, large: null },
        status: 'Status 0',
        uniqueUrlName: 'xz',
      },
      {
        id: 2,
        name: 'SomeName',
        followed: true,
        photos: { small: null, large: null },
        status: 'Status 0',
        uniqueUrlName: 'xz',
      },
      {
        id: 3,
        name: 'SomeName',
        followed: true,
        photos: { small: null, large: null },
        status: 'Status 0',
        uniqueUrlName: 'xz',
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  }
})

test('follow success', () => {
  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
