import * as types from "../actionTypes";
import {gql, checkToken} from './user'


const getAllPostsReguest = () => ({
  type: types.GET_ALL_POSTS_REQUEST
});

const getAllPostsReguestSuccess = payload => ({
  type: types.GET_ALL_POSTS_REQUEST_SUCCESS,
  payload
});

// const getAllPostsRuguestFail = payload => ({
//   type: types.GET_ALL_POSTS_REQUEST_FAIL,
//   payload
// });

export const getAllPosts = () => {
  return async dispatch => {
    dispatch(getAllPostsReguest());
      checkToken();
      const res = await gql.request(
        `query postAll{
          PostFind(query: "[{}]"){
            _id,
            text,
            title,
            images{_id, url}
            owner{_id},
            likes{_id, owner{_id}},
            comments{
              _id, text
            }
          }
        } `
      );
      dispatch(getAllPostsReguestSuccess(res.PostFind)) ;
  };
};

