import * as types from "../actionTypes";
import { gql, checkToken } from "./user";

const addLikeRuguest = () => ({
  type: types.ADD_LIKE_REQUEST
});

const addLikeRuguestSuccess = (id, payload) => ({
  type: types.ADD_LIKE_REQUEST_SUCCESS,
  id, payload
});

export const addLike = id => {
  return async dispatch => {
    dispatch(addLikeRuguest());
    checkToken();
    const res = await gql.request(
      `mutation like($like: LikeInput){
                 LikeUpsert(like: $like) {
                 			_id, owner{_id}
                   }
                 }`,
      { like: { post: { _id: id } } }
    );
    if (res.LikeUpsert){
    dispatch(addLikeRuguestSuccess(id, res.LikeUpsert));
    }
  };
};
  const delLikeRuguest = () => ({
    type: types.DEL_LIKE_REQUEST
  });

  const delLikeRuguestSuccess = payload => ({
    type: types.DEL_LIKE_REQUEST_SUCCESS,
    payload
  });

 export const delLike = id => {
    return async dispatch => {
        dispatch(delLikeRuguest());
          checkToken();
          const res = await gql.request(
            `mutation like($like: LikeInput){
              LikeDelete(like: $like) {
                    _id
                }
              }`,
            { like: { _id: id  } }
          );

          dispatch(delLikeRuguestSuccess()) ;
  };
 }