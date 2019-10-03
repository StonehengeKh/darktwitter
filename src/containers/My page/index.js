import React, { Component } from "react";
import { connect } from "react-redux";
import {getAllMyPosts} from '../../actions/myposts'
import { Link } from "react-router-dom";
import "./style.css";



class MyPage extends Component {


	componentDidMount(){
	const {getAllMyPosts, user} = this.props
	getAllMyPosts(user.id)
	}


	render() {
		const {isFetching, myPosts} = this.props
		return (
			<div>
			{isFetching ? (
				<div>Loading...</div>
			  ) : (<>
				{
				myPosts && myPosts.map(post => <p key={post._id}><Link to={`/post/${post._id}`}> {post.title}</Link></p>)
				}
				</>
			  )}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReduser.user,
		isFetching: state.myPostsReduser.isFetching,
		myPosts: state.myPostsReduser.myPosts
	};
};

export default connect(mapStateToProps, {getAllMyPosts})(MyPage);
