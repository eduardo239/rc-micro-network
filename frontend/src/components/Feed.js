import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/modal';
import { get_post, get_posts_pagination } from '../store/post';

import Loading from './component/Loading';

import PostIcons from './component/PostIcons';

import styles from './css/Feed.module.css';

const Feed = () => {
  const { data: postsData, loading: loadingPosts } = useSelector(
    (state) => state.post.posts
  );
  const { data: searchData, error: errorData } = useSelector(
    (state) => state.post.search
  );

  const { data: loginData } = useSelector((state) => state.user.login);
  const { error: deleteError } = useSelector((state) => state.post.delete);
  console.log(postsData);
  const dispatch = useDispatch();

  const modalHandler = (id) => {
    dispatch(get_post(id));
    dispatch(openModal());
  };

  // TODO mostrar no mesmo .map
  return (
    <div className={styles.Feed}>
      {loadingPosts && <Loading />}
      {errorData && (
        <p className='App-message App-message-error'>{errorData}</p>
      )}
      {searchData
        ? searchData.map((post) => (
            <div className={`App-post ${styles.Post}`} key={post._id}>
              <img
                className={styles.Image}
                onClick={() => modalHandler(post._id)}
                src={post.image}
                alt={post.userId}
              />
              <p>{post.content}</p>
              <PostIcons post={post} user={loginData} error={deleteError} />
            </div>
          ))
        : postsData &&
          loginData &&
          postsData.map((post) => (
            <div className={`App-post ${styles.Post}`} key={post._id}>
              <img
                className={styles.Image}
                onClick={() => modalHandler(post._id)}
                src={post.image}
                alt={post.userId}
              />
              <p>{post.content}</p>
              <PostIcons post={post} user={loginData} error={deleteError} />
            </div>
          ))}
    </div>
  );
};

export default Feed;
