import profileReducer, {
  addPostActionCreator,
  deletePost,
} from './profileReducer'

let state = {
  postsData: [
    {
      id: 1,
      post: 'Hello , How are you ?',
      likesCount: 15,
      src: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
    },
    {
      id: 2,
      post: "It's My First Post !",
      likesCount: 11,
      src: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
    },
    {
      id: 3,
      post: 'Hello, I am Jane ',
      likesCount: 20,
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
    },
  ],
}

test('length of posts should be incremented', () => {
  let action = addPostActionCreator('Some-text')

  let newState = profileReducer(state, action)

  expect(newState.postsData.length).toBe(4)
})

test('post of new post should be correct', () => {
  let action = addPostActionCreator('Some-text')

  let newState = profileReducer(state, action)

  expect(newState.postsData[3].post).toBe('Some-text')
})

test('after deleting length of posts should be decrement', () => {
  let action = deletePost(1)

  let newState = profileReducer(state, action)

  expect(newState.postsData.length).toBe(2)
})
