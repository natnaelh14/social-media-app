import React, { Component } from "react";
import { connect } from 'react-redux';
import { createMemoryHistory } from 'history';
const history = createMemoryHistory()
import Header from "../components/Header/header.component";
import SignIn from "../components/SignIn/sign-in.component";
import Feed from "../components/Feed/feed.component";
import LeftSidebar from "../components/LeftSideBar/left-sidebar.component";
import RightSidebar from "../components/RightSideBar/right-sidebar.component";
import { BrowserRouter as Switch, Route, Router, Redirect } from "react-router-dom";
import PostList from "../components/PostList/post-list.component";
import Profile from "../components/Profile/profile.component";
import AddPost from "../components/AddPost/add-post.component";
import PostDetails from "../screens/ProfileDetails/profile-details.component";
import { FeedContainer } from "./Router.styles";
import { setCurrentUser } from '../redux/actions/userActions';
import { getCurrentUser } from '../redux/user.selectors';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import {
  ApolloClient,
  InMemoryCache, gql
} from "@apollo/client";

type MyProps = {
  setCurrentUser: any;
  currentUser: any;
};

const client = new ApolloClient({
  cache: new InMemoryCache(), //New instance of InMemoryCache
  uri: "http://localhost:3001/graphql",
});
const qr = gql`
    query getUser($id: ID!) {
    userProfile(id: $id) {
      id
      email
      handle
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
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth returns null when auth.signOut() is called
      if (userAuth) {
        try {
          const result = await client.query({
            query: qr,
            variables: {
              id: userAuth.uid
            }
          })          
        } catch (e) {
          try {
              const wow = await client.mutate({
                mutation: newUser,
                variables: {
                  id: userAuth.uid,
                  email: userAuth.email,
                  handle: userAuth.displayName
                }
              })
          } catch (e) {
            console.log("Well, That didnt't work either")
          }
        }

        const userRef: any = await createUserProfileDocument(userAuth);
        //From this, we are going to get back the first state from our data.
        userRef.onSnapshot((snapShot: any) => {
          //We actually don't get any data, until we use the data method.
          setCurrentUser({ id: snapShot.id, ...snapShot.data() });
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
            <Route exact path="/home/notifications">
              {this.props.currentUser ? <PostList /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/post">
              {this.props.currentUser ? <PostDetails /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/add-post">
              {this.props.currentUser ? <AddPost /> : <Redirect to="/signin" />}
            </Route>
            <Route exact path="/home/feed">
              {this.props.currentUser ? <PostList /> : <Redirect to="/signin" />}
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
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: any) => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);