import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotificationsProvider() {
  return (
    <ToastContainer
      draggable={false}
      autoClose={2000}
      pauseOnFocusLoss={false}
      position="bottom-center"
    />
  );
}

export default React.memo(NotificationsProvider);
