import React from 'react';

//Import css module
import classes from './LiveChat.module.css';

//Import livechat actions
import { liveChatActions } from '../store/live-chat';

//Import from react-redux
import { useSelector, useDispatch } from 'react-redux';

const LiveChat = () => {
  //Select show live chat state
  const showLiveChat = useSelector((state) => state.liveChat.showLiveChat);

  //dispath
  const dispatch = useDispatch();

  //Click live chat button handler
  const clickLiveChatHandler = () => {
    //Dispatch to toggle showLiveChat state
    dispatch(liveChatActions.toggleShowLiveChat());
  };

  return (
    <div className={classes['live-chat']}>
      <button
        className={classes['live-chat-btn']}
        onClick={clickLiveChatHandler}
      >
        <i className='fa-brands fa-facebook-messenger'></i>
      </button>
      {/* Render live chat popup */}
      {showLiveChat && (
        <div className={classes['livechat-popup']}>
          <div className={classes.container}>
            <div className={classes.title}>
              <h3>Customer Support</h3>
              <button>Let's Chat App</button>
            </div>
            <div className={classes.content}>
              <div className={classes.top}>
                <p>Xin chào</p>
                <p>Làm thế nào để xem các sản phẩm</p>
              </div>
              <div className={classes.bottom}>
                <div>
                  <p className={classes.icon}>
                    <i className='fa-solid fa-user-tie'></i>
                  </p>
                  <p>ADMIN: Chào bạn</p>
                </div>
                <div>
                  <p className={classes.icon}>
                    <i className='fa-solid fa-user-tie'></i>
                  </p>
                  <p>ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm</p>
                </div>
              </div>
            </div>
            <div className={classes.message}>
              <p className={classes.icon}>
                <i className='fa-solid fa-user-tie'></i>
              </p>
              <input placeholder='Enter Message!' type='text' />
              <i className='fa-solid fa-paperclip'></i>
              <i className='fa-solid fa-face-smile'></i>
              <i className='fa-solid fa-paper-plane'></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
