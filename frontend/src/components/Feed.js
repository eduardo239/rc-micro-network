import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Loader, Segment } from 'semantic-ui-react';
import { openModal } from '../store/modal';
import { get_post, get_posts_pagination } from '../store/post';
import Pagination2 from './component/Pagination';

import PostIcons from './component/PostIcons';

const Feed = () => {
  const { data: postsData, loading: loadingPosts } = useSelector(
    (state) => state.post.posts
  );
  // const { error: errorSearch } = useSelector((state) => state.post.search);
  const { data: loginData } = useSelector((state) => state.user.login);
  const { error: deleteError } = useSelector((state) => state.post.delete);
  const { ui: theme } = useSelector((state) => state);

  const [activePage, setActivePage] = React.useState(1);
  // eslint-disable-next-line
  const [limit, setLimit] = React.useState(2);

  const dispatch = useDispatch();

  const modalHandler = (id) => {
    if (!loginData) {
      alert('You are not logged in.');
      return;
    }
    dispatch(get_post(id));
    dispatch(openModal());
  };

  const changePage = async (d) => {
    if (postsData.length === 0 || postsData.length < limit) {
      console.log('end');
    } else {
      await dispatch(get_posts_pagination({ skip: d * limit, limit }));
    }
  };

  React.useEffect(() => {
    (async () => {
      await dispatch(get_posts_pagination({ skip: 0, limit }));
    })();
  }, [dispatch, activePage, limit]);

  return (
    <>
      {loadingPosts && (
        <Segment padded basic>
          <Loader active />
        </Segment>
      )}

      {postsData &&
        postsData.map((post) => (
          <Segment
            key={post._id}
            style={{ marginBottom: '0.5rem' }}
            inverted={theme !== 'light'}
          >
            <img
              style={{ cursor: 'pointer' }}
              onClick={() => modalHandler(post._id)}
              src={post.image}
              alt={post.userId.name}
            />
            <p style={{ marginTop: '1rem', wordBreak: 'break-all' }}>
              {post.content}
            </p>
            {loginData && (
              <PostIcons post={post} login={loginData} error={deleteError} />
            )}
          </Segment>
        ))}
      {postsData && (
        <Pagination2
          defaultActivePage={1}
          totalPages={10}
          activePage={activePage}
          setActivePage={setActivePage}
          changePage={changePage}
        />
      )}
    </>
  );
};

export default Feed;
