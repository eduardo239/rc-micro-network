import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { get_like, get_posts, get_post, delete_post } from '../../store/post';
import { closeModal, openModal, open_edit_post } from '../../store/modal';
import { Link } from 'react-router-dom';
import { thousand_converter } from '../../helper/thousandConverter';

import styles from '../css/PostIcons.module.css';

import avatar from '../../assets/img/avatar.png';

import { ReactComponent as FavoriteIcon } from '../../assets/ico/white/carbon_favorite.svg';
import { ReactComponent as ChatIcon } from '../../assets/ico/white/carbon_chat.svg';
import { ReactComponent as DeleteIcon } from '../../assets/ico/white/carbon_delete.svg';
import { ReactComponent as EditIcon } from '../../assets/ico/white/carbon_edit.svg';

const PostIcons = ({ post, error, login }) => {
  const modal = useSelector((state) => state.modal.post_modal);
  const dispatch = useDispatch();

  const likeHandler = async () => {
    if (post) await dispatch(get_like(post._id));
    await dispatch(get_posts());
    dispatch(get_post(post._id));
  };

  const commentHandler = () => {
    dispatch(get_post(post._id));
    dispatch(openModal());
  };

  const deleteHandler = async (id) => {
    await dispatch(delete_post(id));
    await dispatch(closeModal());
    if (!error) dispatch(get_posts());
  };

  const editHandler = async (id) => {
    await dispatch(open_edit_post());
    if (!error) dispatch(get_posts());
  };

  return (
    <>
      <div className={styles.IconsContainer}>
        <div className='flex'>
          <div
            className='App-avatar-mini'
            style={{
              background: `url(${post.userId.imageAvatar || avatar})`,
            }}
          ></div>
          <Link to={`profile/${post.userId._id}`}>{post.userId.name}</Link>
        </div>
        <div className={styles.Icons}>
          <button onClick={likeHandler} className='App-btn-icon'>
            <FavoriteIcon />
            <span>{thousand_converter(parseInt(post.likes))}</span>
          </button>
          {!modal && (
            <button onClick={commentHandler} className='App-btn-icon'>
              <ChatIcon />
              <span>{post.comments.length}</span>
            </button>
          )}
          {login?._id === post.userId._id && (
            <>
              {modal && (
                <button
                  className='App-btn-icon'
                  onClick={() => editHandler(post._id)}
                >
                  <EditIcon />
                </button>
              )}

              <button
                className='App-btn-icon'
                onClick={() => deleteHandler(post._id)}
              >
                <DeleteIcon />
              </button>
            </>
          )}
        </div>
      </div>

      {error && <p className='App-message App-message-error'>{error}</p>}
    </>
  );
};

export default PostIcons;
