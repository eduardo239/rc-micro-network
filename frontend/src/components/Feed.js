import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Loader, Segment } from 'semantic-ui-react';
import { openModal } from '../store/modal';
import { get_post, get_posts_pagination } from '../store/post';

import PostIcons from './component/PostIcons';

const Feed = () => {
  const { data: postsData, loading: loadingPosts } = useSelector(
    (state) => state.post.posts
  );
  // const { error: errorSearch } = useSelector((state) => state.post.search);
  const { data: loginData } = useSelector((state) => state.user.login);
  const { error: deleteError } = useSelector((state) => state.post.delete);

  // eslint-disable-next-line
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [pages, setPages] = React.useState(3);
  // eslint-disable-next-line
  const [wait, setWait] = React.useState(false);
  // const [infinite, setInfinite] = React.useState(true);

  const dispatch = useDispatch();

  const modalHandler = (id) => {
    if (!loginData) {
      alert('You are not logged in.');
      return;
    }
    dispatch(get_post(id));
    dispatch(openModal());
  };

  React.useEffect(() => {
    const fetchPages = async () => {
      await dispatch(get_posts_pagination({ skip: 0, limit: 10 }));
    };
    fetchPages();
  }, [dispatch]);

  return (
    <div>
      {loadingPosts && <Loader size='mini'>Loading</Loader>}
      {postsData &&
        postsData.map((post) => (
          <div key={post._id} style={{ marginBottom: '0.5rem' }}>
            <div>
              <img
                style={{ cursor: 'pointer' }}
                onClick={() => modalHandler(post._id)}
                src={post.image}
                alt={post.userId.name}
              />
              <p style={{ marginTop: '1rem' }}>{post.content}</p>
              {loginData && (
                <PostIcons post={post} login={loginData} error={deleteError} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Feed;
