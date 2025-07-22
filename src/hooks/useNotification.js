import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    isVisible: false,
    id: null
  });

  const showNotification = useCallback((message, type = 'info', options = {}) => {
    const id = Date.now();
    setNotification({
      message,
      type,
      isVisible: true,
      id,
      ...options
    });
    return id;
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  const showSuccess = useCallback((message, options) => {
    return showNotification(message, 'success', options);
  }, [showNotification]);

  const showError = useCallback((message, options) => {
    return showNotification(message, 'error', options);
  }, [showNotification]);

  const showWarning = useCallback((message, options) => {
    return showNotification(message, 'warning', options);
  }, [showNotification]);

  const showInfo = useCallback((message, options) => {
    return showNotification(message, 'info', options);
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
