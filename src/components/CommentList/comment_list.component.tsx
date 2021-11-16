import React, { useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_COMMENTS } from '../../utils/queries';
import Comment from '../Comment/comment.component';

type postListProps = {
    postId: number,
};

const CommentList = ({ postId }: postListProps) => {


    const { data } = useQuery(QUERY_COMMENTS, {
        variables: { post_id: postId },
    });
    // const commentList = commentData.sort((a: any, b: any) => new Moment(b.created_at).format('YYYYMMDDHHMMSS') - new Moment(a.created_at).format('YYYYMMDDHHMMSS'));
    let commentArray: Array<{
        id: number,
        post_id: number,
        user_id: string,
        text: string,
        created_at: Date
    }> = data;


    useEffect(() => {
    }, [data])
    return (
        <>
            {/* {commentArray &&
                commentArray.map((comment) => <Comment key={comment.id} commentId={comment.id} postId={comment.post_id} userId={comment.user_id} commentTime={comment.created_at} text={comment.text} />)} */}
        </>
    )
}

export default CommentList;
