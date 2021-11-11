import React from "react";
import { createMemoryHistory } from 'history'
import Header from "../components/Header/header.component";
import SigninAndSignupPage from "../screens/SignInAndSignUp/SignInAndSignUp.component";
import Feed from "../components/Feed/feed.component";
import LeftSidebar from "../components/LeftSideBar/left-sidebar.component";
import RightSidebar from "../components/RightSideBar/right-sidebar.component";
import { BrowserRouter as Switch, Route, Router } from "react-router-dom";
import PostList from "../components/PostList/post-list.component";
import Profile from "../components/Profile/profile.component";
import AddPost from "../components/AddPost/add-post.component";
import PostDetails from "../screens/ProfileDetails/profile-details.component";
import { FeedContainer } from "./Router.styles";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
const { store } = require("../redux/store.ts");
import { Provider } from "react-redux";
//Enable apollo devtools, if  production is set to false
const connectToDevTools = process.env.REACT_APP_PRODUCTION === "false";

const client = new ApolloClient({
  //New instance of ApolloClient
  cache: new InMemoryCache(), //New instance of InMemoryCache
  uri: "http://localhost:3001/graphql",
  connectToDevTools
});

const Routes: React.FC = () => {
  const history = createMemoryHistory()
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/signin" component={SigninAndSignupPage} />
            <Route exact path="/" component={Feed} />
            <FeedContainer>
              <Route path="/home" component={LeftSidebar} />
              <Route exact path="/home/messages" component={PostList} />
              <Route exact path="/home/profile" component={Profile} />
              <Route exact path="/home/explore" component={PostList} />
              <Route exact path="/home/notifications" component={PostList} />
              <Route exact path="/home/post" component={PostDetails} />
              <Route exact path="/home/add-post" component={AddPost} />
              <Route exact path="/home/feed" component={PostList} />
              <Route path="/home" component={RightSidebar} />
            </FeedContainer>
          </Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default Routes;
