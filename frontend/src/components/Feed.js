import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../store/modal';
import { get_post } from '../store/post';

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

  // const [pages, setPages] = React.useState([1]);
  // const [pagesBefore, setPagesBefore] = React.useState([1]);
  // const [infinite, setInfinite] = React.useState(true);

  const dispatch = useDispatch();

  const modalHandler = (id) => {
    dispatch(get_post(id));
    dispatch(openModal());
  };

  // React.useEffect(() => {
  //   let wait = false;
  //   const scrollHandler = async () => {
  //     if (infinite) {
  //       const scroll = window.scrollY;
  //       const height = document.body.offsetHeight - window.innerHeight;

  //       if (scroll > height * 0.75 && !wait && infinite) {
  //         setPages((pages) => [...pages, pages.length + 1]);
  //         wait = true;

  //         setPagesBefore(pages.length * 5);

  //         const payload = await dispatch(
  //           get_posts_pagination({
  //             skip: 0,
  //             limit: 5 * pages.length,
  //           })
  //         );

  //         if (pagesBefore < payload.length) setInfinite(false);
  //         setTimeout(() => (wait = false), 1000);
  //       }
  //     }
  //   };

  //   window.addEventListener('wheel', scrollHandler);
  //   window.addEventListener('scroll', scrollHandler);

  //   return () => {
  //     window.removeEventListener('wheel', scrollHandler);
  //     window.removeEventListener('scroll', scrollHandler);
  //   };
  // }, [dispatch, infinite, pages, pagesBefore]);

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
                alt={post.userId.name}
              />
              <p>{post.content}</p>
              <PostIcons post={post} user={loginData} error={deleteError} />
            </div>
          ))}
    </div>
  );
};

export default Feed;
