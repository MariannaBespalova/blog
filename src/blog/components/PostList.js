import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import PostItem from "./PostItem"


class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: []
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.setState({ loading: true });
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(posts => {
        this.setState({
          loading: false,
          posts
        })
      })
      .catch(e => {
        this.setState({
          loading: false,
        });
        alert(e.message)
      })

  }

  render() {
    const { loading, posts } = this.state;
    const { onPostClick } = this.props;
    return (
      <div className="post-list-wrapper">
          <LoadingOverlay active={loading} />
        {posts.map(post => <PostItem onClick={() => onPostClick(post)} post={post} key={post.id} />)}
      </div>
    )
  }
}


export default Posts;