import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { postListReducer } from './reducers/postReducers';
import { currentUserReducer, userListReducer } from './reducers/userReducers';


const reducer = combineReducers({
  postList: postListReducer,
  userList: userListReducer,
  currentUser: currentUserReducer
});

const initialState = {};

// const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch