import React, { useEffect, useState } from 'react';
import { Fade } from "@mui/material";
import FriendRequestBox from '../FriendRequestBox/friend_request_box.component';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_FRIEND_REQUESTS } from '../../utils/queries';
import { useAppSelector } from "../../app/hooks";
import { userProps } from '../../index.types';

type UserProps = {
    id: string,
    handle: string,
    avatar: string
}

const FriendRequests = () => {

    // const [friendRequestsData, setFriendRequestsData] = useState([]);
    const currentUser = useAppSelector(state => state.currentUser)
    const { user }: {
        user: UserProps,
        // loading: boolean
    } = currentUser
    // if (userLoading) {
    //     return <div>Loading</div>
    // }
    var { loading, error, data } = useQuery(QUERY_FRIEND_REQUESTS, {
        variables: {
            id: user.id
        },
    });
    if (loading || !data) {
        return <div>Loading</div>
    }
    if (error) {
        return <div>Error</div>
    }
    // if(data) {
    //     setFriendRequestsData(data.friendRequests)
    // }
    // }
    // if (data) {
    //     // var { friendRequests } = data;
    //     // setFriendRequestsData(friendRequests)
    // }

    // useEffect(() => {
    //         setFriendRequestsData(friendRequests)
    //         console.log('kevin', friendRequestsData)
    // }, [])
    const friendRequestsData = data.friendRequests
    console.log('friend', friendRequestsData)
    return (
        <div style={{ width: '66%', margin: '10px' }}>
            <Fade in={true} timeout={1000}>
                <div style={{ border: '1px solid #cdcdcd', padding: '20px', margin: '50px' }}>
                    {friendRequestsData && (
                        friendRequestsData.map((user: any) => {
                            return <FriendRequestBox key={user.id} userId={user.id} userHandle={user.handle} userAvatar={user.avatar} />
                        })
                    )}
                </div>
            </Fade>
        </div>
    )
}

export default FriendRequests;
