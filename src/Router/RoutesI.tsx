import { Fragment, Component } from "react";
import { connect } from "react-redux";
import { createMemoryHistory } from "history";
const history = createMemoryHistory();
import Header from "../components/Header/header.component";
import SignIn from "../components/SignIn/SignIn";
import LeftSidebar from "../components/LeftSideBar/left-sidebar.component";
import RightSidebar from "../components/RightSideBar/right-sidebar.component";
import { Navigate, Route, Routes } from "react-router-dom";
import PostList from "../components/PostList/post-list.component";
import { FeedContainer } from "./Router.styles";
import { setCurrentUser } from "../redux/actions/userActions";
import { listPosts, listPostsByFollowing } from "../redux/actions/postActions";
import { getCurrentUser } from "../redux/user.selectors";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import { gql } from "@apollo/client";
import { client } from "../index";
import {
  QUERY_USER,
  QUERY_POSTS_BY_FOLLOWING,
  QUERY_FRIEND_REQUEST,
} from "../utils/queries";
import { CREATE_USER_PROFILE, FRIEND_REQUEST } from "../utils/mutations";
import GuestProfile from "../components/GuestProfile/guest_profile.component";
import ProfilePage from "../pages/profile_page";
import CryptoPage from "../pages/crypto_page";
import ChatPage from "../pages/chat_page";
import ExplorePage from "../pages/explore_page";
import NotificationPage from "../pages/notification_page";
import MessagePage from "../pages/message_page";
import Messages from "../components/Messages/messages.component";
import FriendRequests from "../components/FriendRequests/friend_requests.component";

type MyProps = {
  setCurrentUser: any;
  listPosts: any;
  currentUser: any;
  listPostsByFollowing: any;
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

class RoutesI extends Component<MyProps, unknown> {
  unsubscribeFromAuth: any = null;

  componentDidMount = () => {
    const { listPosts, listPostsByFollowing, setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // userAuth returns null when auth.signOut() is called
      if (userAuth) {
        try {
          const result = await client.query({
            query: QUERY_USER,
            variables: {
              id: userAuth.uid,
            },
          });
          if (!result?.data?.userProfile) {
            await client.mutate({
              mutation: CREATE_USER_PROFILE,
              variables: {
                id: userAuth.uid,
                email: userAuth.email,
                handle: userAuth.displayName,
              },
            });
          }
        } catch (e) {
          console.log("Unable to create a user account");
        }
        const userRef: any = await createUserProfileDocument(userAuth);
        //From this, we are going to get back the first state from our data.
        userRef.onSnapshot(async (snapShot: any) => {
          //We actually don't get any data, until we use the data method.
          const {
            data: { posts: postsData },
          } = await client.query({
            query: QUERY_POSTS,
            variables: {
              user_id: userAuth.uid,
            },
          });
          listPosts(postsData);
          const {
            data: { postsByFollowing: postsDataByFollowing },
          } = await client.query({
            query: QUERY_POSTS_BY_FOLLOWING,
            variables: {
              user_id: userAuth.uid,
            },
          });
          const { data } = await client.query({
            query: QUERY_FRIEND_REQUEST,
            variables: {
              sender_id: "chG0WmOFPheLzl528legA3iIpbO2",
              receiver_id: userAuth.uid,
            },
          });
          if (
            !data?.friendRequest &&
            !(userAuth.uid === "chG0WmOFPheLzl528legA3iIpbO2")
          ) {
            await client.mutate({
              mutation: FRIEND_REQUEST,
              variables: {
                sender_id: "chG0WmOFPheLzl528legA3iIpbO2",
                receiver_id: userAuth.uid,
              },
            });
          }
          listPostsByFollowing(postsDataByFollowing);
          const {
            data: { userProfile },
          } = await client.query({
            query: QUERY_USER,
            variables: {
              id: userAuth.uid,
            },
          });
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
            ...userProfile,
          });
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
      <Fragment>
        <Header />
        <Routes>
          <Route
            path="/signin"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <Navigate to="/home/feed" replace />
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            path="/"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <Navigate to="/home/feed" replace />
              ) : (
                <SignIn />
              )
            }
          />
          {/* <FeedContainer> */}
          <Route
            path="/home"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <LeftSidebar />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/messages"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <MessagePage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/messages/:messagesId"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <Messages />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/profile"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <ProfilePage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/profile/:profileId"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <GuestProfile />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/explore"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <ExplorePage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/crypto"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <CryptoPage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/notifications"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <NotificationPage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/chat"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <ChatPage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/feed"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <PostList />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home/requests"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <FriendRequests />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/home"
            element={
              this.props.currentUser &&
              Object.keys(this.props.currentUser)?.length ? (
                <RightSidebar />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          {/* </FeedContainer> */}
        </Routes>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
  listPosts: (posts: any) => dispatch(listPosts(posts)),
  listPostsByFollowing: (posts: any) => dispatch(listPostsByFollowing(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesI);
