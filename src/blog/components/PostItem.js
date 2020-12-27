import React from "react";
import { Feed, Button } from "semantic-ui-react";
import Comments from "./Comments";

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areCommentsShown: false
    }
  }

  render() {
    const { post, onClick } = this.props;
    const { areCommentsShown } = this.state
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary onClick={onClick}>
              <Feed.User>{post.title}</Feed.User>
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Extra text>
              {post.body}
            </Feed.Extra>
            <Button onClick={() => this.setState({ areCommentsShown: !this.state.areCommentsShown })}>{areCommentsShown ? "Hide Comments": "Show Comments"}</Button>
            {areCommentsShown && <Comments postId={post.id} />}
          </Feed.Content>
        </Feed.Event>
      </Feed>
    )
  }
}

export default PostItem;
