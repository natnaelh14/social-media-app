import { gql } from "@apollo/client";
import { createMemoryHistory } from "history";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "~/components/Footer/Footer";
import FriendRequests from "~/components/FriendRequests/friend_requests.component";
import GuestProfile from "~/components/GuestProfile/guest_profile.component";
import Header from "~/components/Header/Header";
import LeftSidebar from "~/components/LeftSideBar/LeftSideBar";
import Messages from "~/components/Messages/messages.component";
import PostList from "~/components/PostList/PostList";
import RightSidebar from "~/components/RightSideBar/RightSideBar";
import SignIn from "~/components/SignIn/SignIn";
import ChatPage from "~/pages/chat_page";
import CryptoPage from "~/pages/crypto_page";
import ExplorePage from "~/pages/explore_page";
import MessagePage from "~/pages/message_page";
import NotificationPage from "~/pages/notification_page";
import ProfilePage from "~/pages/profile_page";
import {
  QUERY_FRIEND_REQUEST,
  QUERY_POSTS_BY_FOLLOWING,
  QUERY_USER,
} from "~/utils/queries";
import { auth, createUserProfileDocument } from "../firebase/utils";
import { client } from "../index";
import { listPosts, listPostsByFollowing } from "../redux/actions/postActions";
import { setCurrentUser } from "../redux/actions/userActions";
import { getCurrentUser } from "../redux/user.selectors";
import { CREATE_USER_PROFILE, FRIEND_REQUEST } from "../utils/mutations";
import { FeedContainer } from "./Router.styles";

const history = createMemoryHistory();

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

const RoutesI = ({
  setCurrentUser,
  listPosts,
  currentUser,
  listPostsByFollowing,
}: MyProps) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const result = await client.query({
            query: QUERY_USER,
            variables: { id: userAuth.uid },
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

        const userRef = await createUserProfileDocument(userAuth, {});
        userRef.onSnapshot(async (snapShot) => {
          const postsData = await client.query({
            query: QUERY_POSTS,
            variables: { user_id: userAuth.uid },
          });
          listPosts(postsData.data.posts);

          const postsDataByFollowing = await client.query({
            query: QUERY_POSTS_BY_FOLLOWING,
            variables: { user_id: userAuth.uid },
          });
          listPostsByFollowing(postsDataByFollowing.data.postsByFollowing);

          const friendRequestData = await client.query({
            query: QUERY_FRIEND_REQUEST,
            variables: {
              sender_id: "chG0WmOFPheLzl528legA3iIpbO2",
              receiver_id: userAuth.uid,
            },
          });

          if (
            !friendRequestData.data?.friendRequest &&
            userAuth.uid !== "chG0WmOFPheLzl528legA3iIpbO2"
          ) {
            await client.mutate({
              mutation: FRIEND_REQUEST,
              variables: {
                sender_id: "chG0WmOFPheLzl528legA3iIpbO2",
                receiver_id: userAuth.uid,
              },
            });
          }

          const userProfileData = await client.query({
            query: QUERY_USER,
            variables: { id: userAuth.uid },
          });
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
            ...userProfileData.data.userProfile,
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, [setCurrentUser, listPosts, listPostsByFollowing]);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/signin"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <Navigate to="/home/feed" replace />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <Navigate to="/home/feed" replace />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/home"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <LeftSidebar />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/messages"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <FeedContainer>
                <LeftSidebar />
                <MessagePage />
                <RightSidebar />
              </FeedContainer>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/messages/:messagesId"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <Messages />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/profile"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <FeedContainer>
                <LeftSidebar />
                <ProfilePage />
                <RightSidebar />
              </FeedContainer>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/profile/:profileId"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <GuestProfile />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/explore"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <ExplorePage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/crypto"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <FeedContainer>
                <LeftSidebar />
                <CryptoPage />
                <RightSidebar />
              </FeedContainer>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/notifications"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <NotificationPage />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/chat"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <FeedContainer>
                <LeftSidebar />
                <ChatPage />
                <RightSidebar />
              </FeedContainer>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/feed"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <FeedContainer>
                <LeftSidebar />
                <PostList />
                <RightSidebar />
              </FeedContainer>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home/requests"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <FeedContainer>
                <LeftSidebar />
                <FriendRequests />
                <RightSidebar />
              </FeedContainer>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/home"
          element={
            currentUser && Object.keys(currentUser)?.length ? (
              <RightSidebar />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (
  dispatch: (arg0: {
    (dispatch: any): Promise<void>;
    (dispatch: any): Promise<void>;
    (dispatch: any): Promise<void>;
  }) => any,
) => ({
  setCurrentUser: (user: any) => dispatch(setCurrentUser(user)),
  listPosts: (posts: any) => dispatch(listPosts(posts)),
  listPostsByFollowing: (posts: any) => dispatch(listPostsByFollowing(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesI);
