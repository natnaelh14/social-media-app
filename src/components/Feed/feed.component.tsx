import React from 'react';
import styled from 'styled-components';
import LeftSidebar from '../LeftSideBar/left-sidebar.component';
import RightSidebar from '../RightSideBar/right-sidebar.component';
import PostList from '../PostList/post-list.component';

const FeedContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 50px;
    margin-right: 50px;
`;



const Feed = () => {
    return (
        <FeedContainer>
            <LeftSidebar />
            <PostList />
            <RightSidebar />
        </FeedContainer>
    )
}

export default Feed
