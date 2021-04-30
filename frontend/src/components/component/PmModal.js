import React from 'react';

import { useDispatch } from 'react-redux';

import { ReactComponent as CloseIcon } from '../../assets/ico/white/carbon_close.svg';
import { send_pm } from '../../store/comments';

import styles from '../css/ProfileContent.module.css';

const PmModal = ({ setPmModal, friend, login }) => {
  const [content, setContent] = React.useState('');
  const [message, setMessage] = React.useState('');
  const modalRef = React.createRef();
  const dispatch = useDispatch();

  const clickOutsideHandler = (e) => {
    if (modalRef && !modalRef.current.contains(e.target)) {
      setPmModal(false);
    }
  };

  const pmHandler = () => {
    if (friend && login) {
      const response = dispatch(
        send_pm({ content, friendId: friend._id, userId: login._id })
      );
      if (response) setMessage('Private message sent.');
      else setMessage('Error');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className='App-modal-container' onClick={clickOutsideHandler}>
      <div className={`${styles.Modal} App-PM`} ref={modalRef}>
        {friend ? (
          <div>
            <button
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => setPmModal(false)}
              className='App-btn-icon-mini App-btn-secondary'
            >
              <CloseIcon />
            </button>
            <h4>Private Message</h4>
            <img
              className='App-avatar-mini'
              src={friend.imageAvatar}
              alt={friend.name}
            />
            <p>to {friend.name}</p>
            <input
              type='text'
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
            <button
              onClick={pmHandler}
              type='submit'
              className='App-btn App-btn-primary'
            >
              Send
            </button>
            {message && (
              <p className='App-message App-message-success'>{message}</p>
            )}
          </div>
        ) : (
          <div>
            <h3>User not found :(</h3>
            <button
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => setPmModal(false)}
              className='App-btn-icon-mini App-btn-secondary'
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PmModal;
