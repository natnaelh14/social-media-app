import React, { Component } from "react";
import { connect } from 'react-redux';
import { createMemoryHistory } from 'history';
const history = createMemoryHistory()
import Header from "../components/Header/header.component";
import SignIn from "../components/SignIn/sign-in.component";
import LeftSidebar from "../components/LeftSideBar/left-sidebar.component";
import RightSidebar from "../components/RightSideBar/right-sidebar.component";
import { BrowserRouter as Switch, Route, Router, Redirect } from "react-router-dom";
import PostList from "../components/PostList/post-list.component";
import Profile from "../components/Profile/profile.component";
import AddPost from "../components/AddPost/add-post.component";
import { FeedContainer } from "./Router.styles";
import { setCurrentUser } from '../redux/actions/userActions';
import { listPosts } from '../redux/actions/postActions'
import { getCurrentUser } from '../redux/user.selectors';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { gql } from "@apollo/client";
import { client } from '../index';
import { QUERY_USER } from '../utils/queries';
import GuestProfile from "../components/GuestProfile/guest_profile.component";
import CryptoPage from '../pages/crypto_page';
import FriendRequests from '../components/FriendRequests/friend_requests.component';

type MyProps = {
  setCurrentUser: any;
  listPosts: any;
  currentUser: any;
};

const QUERY_POSTS = gql`
query posts($user_id: ID!) {
  posts(user_id: $user_id) {
    id
    user_id
    text
    created_at
  }
}
`;

const newUser = gql`
  mutation($id: ID!, $email: String!, $handle: String!) {
    addUserProfile(        
        id: $id
        email: $email
        handle: $handle) {
        id
        email
        handle
        }
  }
`;

class Routes extends Component<MyProps, {}> {
  unsubscribeFromAuth: any = null;

  componentDidMount = () => {
    const { listPosts, setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth returns null when auth.signOut() is called
      if (userAuth) {
        try {
          const result = await client.query({
            query: QUERY_USER,
            variables: {
              id: userAuth.uid
            }
          })
        } catch (e) {
          try {
            await client.mutate({
              mutation: newUser,
              variables: {
                id: userAuth.uid,
                email: userAuth.email,
                handle: userAuth.displayName
              }
            })
          } catch (e) {
            console.log("Unable to create a user account")
          }
        }
        const userRef: any = await createUserProfileDocument(userAuth);
        //From this, we are going to get back the first state from our data.
        userRef.onSnapshot(async(snapShot: any) => {
          //We actually don't get any data, until we use the data method.
          const { data: { posts: postsData } } = await client.query({
            query: QUERY_POSTS,
            variables: {
              user_id: userAuth.uid
            }
          })
          listPosts(postsData)
          const { data: { userProfile } } = await client.query({
            query: QUERY_USER,
            variables: {
              id: userAuth.uid
            }
          })
          setCurrentUser({ id: snapShot.id, ...snapShot.data(), ...userProfile});
        });

      }
      setCurrentUser(userAuth);
    });
  };

  componentWillUnmount = async () => {
    // To prevent memory leak, when it unmounts, it removes the userAuth object
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/signin">
            {this.props.currentUser ? <Redirect to="/home/feed" /> : <SignIn />}
          </Route>
          <Route exact path="/">
            {this.props.currentUser ? <Redirect to="/home/feed" /> : <SignIn />}
          </Route>
          <FeedContainer>
            <Route path="/home">
              {this.props.currentUser ? <LeftSidebar /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/messages">
              {this.props.currentUser ? <PostList /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/profile">
              {this.props.currentUser ? <Profile /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/explore">
              {this.props.currentUser ? <PostList /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/crypto">
              {this.props.currentUser ? <CryptoPage /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/notifications">
              {this.props.currentUser ? <PostList /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/profile/:profileId">
              {this.props.currentUser ? <GuestProfile /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/add-post">
              {this.props.currentUser ? <AddPost /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/feed">
              {this.props.currentUser ? <PostList /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/requests">
              {this.props.currentUser ? <FriendRequests /> : <Redirect to="/signin" />}
            </Route>
            <Route path="/home">
              {this.props.currentUser ? <RightSidebar /> : <Redirect to="/signin" />}
            </Route>
          </FeedContainer>
        </Switch>
      </Router>
    )
  }
};

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
  // postsList: getPostsList(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
  listPosts: (posts: any) => dispatch(listPosts(posts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);