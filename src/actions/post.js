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
            owner{_id},
            likes{_id, owner{_id}},
            comments{
              _id, text
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
