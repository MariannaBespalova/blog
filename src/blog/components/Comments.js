import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import { Comment } from "semantic-ui-react";


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      comments: [],
      error: ''
    }
  }

  componentDidMount() {
    const { postId } = this.props;
    if (postId) {
      this.fetchComments(postId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postId !== this.props.postId && this.props.postId) {
      this.fetchComments(this.props.postId);
    }
  }

  fetchComments(postId) {
    this.setState({ loading: true });
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => response.json())
      .then(data => { this.setState({ comments: data, loading: false })
      })
      .catch(e => this.setState({ error: e.message, loading: false, comments: null }))
  }

  render() {
    const { comments, loading, error } = this.state;
    return (
      <div>
        <div className='error'>{error}</div>
        <LoadingOverlay active={loading} />
        <Comment.Group threaded>
        {comments.map(comment => {
          return <Comment key={comment.id}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{comment.name}</Comment.Author>
              <Comment.Metadata>
                <div>{comment.email}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
            </Comment.Content>
          </Comment>
        }
        )}
        </Comment.Group>
      </div>
    );
  }
}
export default Comments;
