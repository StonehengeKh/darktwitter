import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getSelectedUser, deleteSelectedUser } from "../../actions/selectedUser";
import Post from "../../components/userPagePostItem";
import defaultAvatar from '../../assets/img/smile.jpg'
import { url } from "../../actions/user";
import Card from "../../components/Card";

const SelectedUserCab = ({
    selectedUser,
    getSelectedUser,
    deleteSelectedUser,
    posts,
    match
}) => {
    let userAvatar;

    useEffect(() => {
        getSelectedUser(match.params.id)
        return () => {
            deleteSelectedUser()
        };
    }, [])
    if (!!selectedUser && !!selectedUser.avatar) {
        userAvatar = selectedUser.avatar.url;
    }
    return (
        <main className="userCabMain">
            {
                !!selectedUser &&
                (
                    <section className="userInfo">

                        <div className="generalInfo">

                            <img src={userAvatar ? url + userAvatar : defaultAvatar} alt="avatar" className="avatar" />
                            <h2>
                                {selectedUser.nick || selectedUser.login}
                            </h2>
                        </div>

                    </section>
                )}

            <section className="myPostsSection">
                {posts && posts.map(post => <Card
                 title={post.title}
                 key={post._id}
                 id={post._id}
                 images={post.images}
                 text={post.text}
                 avatar={selectedUser.avatar}
                 nick={selectedUser.nick}
                 login={selectedUser.login}
                 createdAt={post.createdAt}
                 comments={post.comments}
                 likes={post.likes}
                 ownerId={post.owner._id}
                     />)}
            </section>
        </main>
    );
};

const mapStateToProps = ({ selectedUserReducer }) => {
    return {
        selectedUser: selectedUserReducer.selectedUser,
        posts: selectedUserReducer.selectedUsersPosts
    };
};

export default connect(
    mapStateToProps,
    { getSelectedUser, deleteSelectedUser }
)(SelectedUserCab);