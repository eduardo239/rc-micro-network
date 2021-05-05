import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../store/modal';
import { resetPostState } from '../store/post';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

import textWithHash from '../helper/textWithHash';
import PostIcons from './component/PostIcons';
import Comment from './Comment';
import EditPost from './component/EditPost';

const Modal = () => {
  const modalRef = React.createRef();
  const commentRef = React.createRef();

  const { data: postData, loading: postLoading } = useSelector(
    (state) => state.post.post
  );
  const { data: loginData } = useSelector((state) => state.user.login);
  const edit_modal = useSelector((state) => state.modal.edit_post_modal);

  const dispatch = useDispatch();

  const clickOutsideHandler = (e) => {
    if (modalRef?.current)
      if (modalRef && !modalRef.current.contains(e.target)) {
        dispatch(closeModal());
        dispatch(resetPostState());
      }
  };

  React.useEffect(() => {
    if (commentRef.current) {
      (() => {
        commentRef.current.innerHTML = textWithHash(
          commentRef.current.innerHTML
        );
      })();
    }
  }, [commentRef]);

  return (
    <div className='App-modal--container' onClick={clickOutsideHandler}>
      {postLoading && <Loader active inline='centered' />}
      {postData && loginData && (
        <div className='App-modal--content' ref={modalRef}>
          <img src={postData.image} alt={postData.userId.name} />
          <Segment basic padded='small' style={{ width: '100%' }}>
            <PostIcons post={postData} user={loginData} />

            <p style={{ marginTop: '1rem' }} ref={commentRef}>
              {postData.content}
            </p>

            {edit_modal && <EditPost post={postData} />}

            <Comment
              user={loginData}
              comments={postData.comments}
              postId={postData._id}
            />
          </Segment>
        </div>
      )}
    </div>
  );
};

export default Modal;
