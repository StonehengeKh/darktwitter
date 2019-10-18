import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const getPostReguest = () => ({
  type: types.GET_POST_REQUEST
});

const getPostReguestSuccess = payload => ({
  type: types.GET_POST_REQUEST_SUCCESS,
  payload
});

const getPostReguestFail = () => ({
  type: types.GET_POST_REQUEST_FAIL
});

export const getPost = (id) => {
  return async dispatch => {
    dispatch(getPostReguest());
    checkToken();
    const res = await gql.request(
      `query post($query:String!){
          PostFindOne(query: $query){
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
              createdAt, 
              likes{_id, owner{_id}}
            }
          }
        } `,
      { query: JSON.stringify([{_id: id}]) }
    );
    if (res.PostFindOne) {
      dispatch(getPostReguestSuccess(res.PostFindOne));
    } else {
      dispatch(getPostReguestFail());
    }
  };
};
