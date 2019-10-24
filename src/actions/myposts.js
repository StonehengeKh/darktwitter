import * as types from "../actionTypes";
import {gql, checkToken} from './user'

const getAllMyPostsRuguest = () => ({
  type: types.GET_ALL_MY_POSTS_REQUEST
});

const getAllMyPostsRuguestSuccess = payload => ({
  type: types.GET_ALL_MY_POSTS_REQUEST_SUCCESS,
  payload
});

const getAllPostsRuguestFail = payload => ({
  type: types.GET_ALL_POSTS_REQUEST_FAIL,
  payload
});

export const getAllMyPosts = id => {
  return async dispatch => {
    dispatch(getAllMyPostsRuguest());
    checkToken();
    const res = await gql.request(
      `query post($query:String!){
            PostFind(query: $query){
              _id,
              text,
              title,
              images{_id, url}
              owner{_id, avatar{_id, url}, nick, login},
              likes{_id, owner{_id}},
              createdAt,
              comments{
                _id, 
                text, 
                owner{_id, avatar{_id, url}, nick, login },
                likes{_id, owner{_id}}
                createdAt,
                post{_id}
              }
            }
          } `,
      { query: JSON.stringify([{___owner: id },{ sort: ["_id", -1]}])}
    );
    if(res.PostFind){ 
      dispatch(getAllMyPostsRuguestSuccess(res.PostFind))
    } else {
      dispatch(getAllPostsRuguestFail(res.PostFind))
    }
  };
};

export const refreshMyPost = payload => ({
  type: types.REFRESH_MY_POST,
  payload
})

export const delMyPosts = () => ({
  type: types.DEL_MY_POSTS
});
