import React from 'react';

import { useDispatch } from 'react-redux';

import { ReactComponent as CloseDeleteIcon } from '../../assets/ico/white/carbon_close.svg';
import { send_pm } from '../../store/comments';

import styles from '../css/ProfileContent.module.css';

const PmModal = ({ setPmModal, friend, login }) => {
  const [content, setContent] = React.useState('');
  const modalRef = React.createRef();
  const dispatch = useDispatch();

  const clickOutsideHandler = (e) => {
    if (modalRef && !modalRef.current.contains(e.target)) {
      setPmModal(false);
    }
  };

  const pmHandler = () => {
    if (friend && login) {
      dispatch(send_pm({ content, friendId: friend._id, userId: login._id }));
    }
  };

  return (
    <div className='App-modal-container' onClick={clickOutsideHandler}>
      <div className={`${styles.Modal} App-PM`} ref={modalRef}>
        <button
          style={{ position: 'absolute', top: '0', right: '0' }}
          onClick={() => setPmModal(false)}
          className='App-btn-icon-mini App-btn-secondary'
        >
          <CloseDeleteIcon />
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
          onClick={() => pmHandler(7777)}
          type='submit'
          className='App-btn App-btn-primary'
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PmModal;
