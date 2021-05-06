import React from 'react';

import { useSelector } from 'react-redux';
import { Pagination, Segment } from 'semantic-ui-react';

const Pagination2 = ({
  defaultActivePage = 5,
  totalPages = 5,
  setActivePage,
  activePage,
  changePage,
}) => {
  const { ui: theme } = useSelector((state) => state);
  return (
    <Segment
      inverted={theme !== 'light'}
      padded
      basic
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Pagination
        inverted={theme !== 'light'}
        defaultActivePage={defaultActivePage}
        firstItem={null}
        lastItem={null}
        pointing
        secondary
        totalPages={totalPages}
        onPageChange={(e, d) => changePage(d.activePage.toString())}
      />
    </Segment>
  );
};

export default Pagination2;
