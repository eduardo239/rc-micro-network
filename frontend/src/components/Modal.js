import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modal';
import { resetPostState } from '../store/post';

import styles from './css/Modal.module.css';

import Loading from './component/Loading';
import PostIcons from './component/PostIcons';
import Comment from './Comment';

const Modal = () => {
  const modalRef = React.createRef();

  const { data: postData, loading: postLoading } = useSelector(
    (state) => state.post.post
  );
  const { data: loginData } = useSelector((state) => state.user.login);

  const dispatch = useDispatch();
  const clickOutsideHandler = (e) => {
    if (modalRef && !modalRef.current.contains(e.target)) {
      dispatch(closeModal());
      dispatch(resetPostState());
    }
  };

  return (
    <div className='App-Modal-container' onClick={clickOutsideHandler}>
      {postLoading ? (
        <Loading />
      ) : (
        postData && (
          <div
            className={`App-border App-modal ${styles.Modal}`}
            ref={modalRef}
          >
            <img
              className={styles.image}
              src={postData.image}
              alt={postData.userId.name}
            />
            <PostIcons post={postData} user={loginData} />

            <p className={styles.Content}>{postData.content}</p>

            <Comment comments={postData.comments} postId={postData._id} />
          </div>
        )
      )}
    </div>
  );
};

export default Modal;
