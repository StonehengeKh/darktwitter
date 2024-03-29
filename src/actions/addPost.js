import * as types from "../actionTypes";
import { gql, checkToken } from "./user";


const createNewPostRequest = () => ({
  type: types.CREATE_NEW_POST_REQUEST
});

const createNewPostRequestSuccess = payload => ({
  type: types.CREATE_NEW_POST_REQUEST_SUCCESS,
  payload
});
const createNewPostRequestFail =() => ({
  type: types.CREATE_NEW_POST_REQUEST_FAIL
});

export const createNewPost = data => {
  return async dispatch => {
    dispatch(createNewPostRequest());
    checkToken();
    const res = await gql.request(
      ` mutation newPost($post:PostInput){
           PostUpsert(post: $post){
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
         }`,
      { post: { title: data.title, text: data.text} } 
    );
    if (res.PostUpsert){
    dispatch(createNewPostRequestSuccess(res.PostUpsert));
    } else {
      dispatch(createNewPostRequestFail());
    }
  };
};