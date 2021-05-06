import React from 'react';
import { useSelector } from 'react-redux';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Link } from 'react-router-dom';
import { Image, Segment } from 'semantic-ui-react';

const ProfilePosts = ({ user }) => {
  const { ui: theme } = useSelector((state) => state);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 250: 1, 550: 2, 900: 3 }}>
      <Masonry>
        {user && user.posts.length > 0 ? (
          user.posts.map((post) => (
            <div key={post._id}>
              <Link to={`../post/${post._id}`}>
                <Image src={post.image}></Image>
              </Link>
            </div>
          ))
        ) : (
          <Segment basic inverted={theme !== 'light'}>
            Posts not found
          </Segment>
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ProfilePosts;
