import React from 'react';
import { Button, List } from 'semantic-ui-react';

const PMList = ({ user }) => {
  return (
    <List divided relaxed>
      {user &&
        user.pm
          .map((p) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2px',
                borderBottom: '1px solid #d4d4d5',
                padding: '2px 0',
              }}
              key={p._id}
            >
              <List.Item>
                <List.Content>
                  <List.Header>{p.friendId.name}</List.Header>
                  {p.content}
                  <p style={{ fontSize: '.75rem' }}>{p.createdAt}</p>
                </List.Content>
              </List.Item>
              <Button.Group size='mini'>
                <Button icon='chat' color='blue' />
                <Button icon='trash alternate outline' color='red' />
              </Button.Group>
            </div>
          ))
          .reverse()}
    </List>
  );
};

export default PMList;
