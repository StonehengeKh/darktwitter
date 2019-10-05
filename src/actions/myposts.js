import * as types from "../actionTypes";
import {gql, checkToken} from './user'

const getAllMyPostsRuguest = () => ({
  type: types.GET_ALL_MY_POSTS_REQUEST
});

const getAllMyPostsRuguestSuccess = payload => ({
  type: types.GET_ALL_MY_POSTS_REQUEST_SUCCESS,
  payload
});

// const getAllPostsRuguestFail = payload => ({
//   type: types.GET_ALL_POSTS_REQUEST_FAIL,
//   payload
// });

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
              owner{_id},
              likes{_id, owner{_id}},
              comments{
                _id, text, owner{_id}
              }
            }
          } `,
      // { query: JSON.stringify([{___owner: {$in: [...id]}}])}
      { query: JSON.stringify([{___owner: id }])}
    );
    dispatch(getAllMyPostsRuguestSuccess(res.PostFind));
  };
};

// export const userFindOne = id => {
//   return async dispatch => {
//     checkToken();
//     const res = await gql.request(
//       `query user($query:String!){
//         UserFindOne(query:$query){
//           _id, login, nick
//           likes{_id},
//           incomings{_id},
//           followers{_id},
//           following{_id}
//         }
//       }
//       `,
//      {query: JSON.stringify([{ _id: id }])}
//     );
//     console.log(res);
//   };
// };
