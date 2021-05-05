import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const PM = () => {
  const [content, setContent] = React.useState('');
  return (
    <Form>
      <Form.Field>
        <label>Name</label>
        <input
          placeholder='Private message'
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </Form.Field>
      <Button type='submit' primary fluid size='small'>
        Submit
      </Button>
    </Form>
  );
};

export default PM;
