import Header from "./components/Header/header.component";
import SigninAndSignupPage from "./screens/SignInAndSignUp/SignInAndSignUp.component";
import Message from "./components/Message/message.component";
import Feed from "./components/Feed/feed.component";
import LeftSidebar from "./components/LeftSideBar/left-sidebar.component";
import RightSidebar from "./components/RightSideBar/right-sidebar.component";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import PostList from "./components/PostList/post-list.component";
import Profile from './components/Profile/profile.component';
import AddPost from "./components/AddPost/add-post.component";
import styled from 'styled-components';

const FeedContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  margin-right: 50px;
`;

const RouterFile = () => {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route exact path="/signin" component={SigninAndSignupPage} />
          <Route exact path="/" component={Feed} />
          <FeedContainer>
            <Route path="/home" component={LeftSidebar} />
            <Route exact path="/home/messages" component={PostList} />
            <Route exact path="/home/profile" component={Profile} />
            <Route exact path="/home/explore" component={PostList} />
            <Route exact path="/home/notifications" component={PostList} />
            <Route exact path="/home/add-post" component={AddPost} />
            <Route exact path="/home/feed" component={PostList} />
            <Route path="/home" component={RightSidebar} />
          </FeedContainer>
        </Switch>
      </div>
    </Router>
  );
};

export default RouterFile;
