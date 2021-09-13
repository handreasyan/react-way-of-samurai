import { actions, unfollow, follow } from './usersReducer'
import { usersAPI } from '../api/users-api'
import { ApiResponseType, ResultCodesEnum } from '../api/api'

jest.mock('../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  usersAPIMock.follow.mockClear()
  usersAPIMock.unFollow.mockClear()
})

const result: ApiResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unFollow.mockReturnValue(Promise.resolve(result))

test('success follow thunk ', async () => {
  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingInProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingInProgress(false, 1)
  )
})

test('success unfollow thunk ', async () => {
  const thunk = unfollow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    actions.toggleFollowingInProgress(true, 1)
  )
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(
    3,
    actions.toggleFollowingInProgress(false, 1)
  )
})
