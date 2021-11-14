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
type MyProps = {
  setCurrentUser: any;
  currentUser: any;
};
class Routes extends Component<MyProps, {}> {
  unsubscribeFromAuth: any = null;

  componentDidMount = () => {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // userAuth returns null when auth.signOut() is called
      if (userAuth) {
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
          <Route exact path="/signin" component={SignIn}>
          {this.props.currentUser ?  <Redirect to="/home/feed" />:<SignIn /> }
          </Route>
          <Route exact path="/" component={Feed}>
          {this.props.currentUser ?  <Redirect to="/home/feed" /> :<SignIn /> }
          </Route>
          <FeedContainer>

            <Route path="/home">
              {this.props.currentUser ?  <LeftSidebar />:<Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/messages">
              {this.props.currentUser ?  <PostList />:<Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/profile">
              {this.props.currentUser ?  <Profile />:<Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/explore">
              {this.props.currentUser ?  <PostList />:<Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/notifications">
              {this.props.currentUser ?  <PostList />: <Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/post" component={PostDetails}>
              {this.props.currentUser ?  <PostDetails />: <Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/add-post" component={AddPost}>
              {this.props.currentUser ?  <AddPost />: <Redirect to="/signin" /> }
            </Route>
            <Route exact path="/home/feed" component={PostList}>
              {this.props.currentUser ?  <PostList />: <Redirect to="/signin" /> }
            </Route>
            <Route path="/home" component={RightSidebar}>
              {this.props.currentUser ?  <RightSidebar />: <Redirect to="/signin" /> }
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
