import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  FiBell, 
  FiAlertCircle,
  FiInfo,
  FiStar,
  FiHeart,
  FiHome,
  FiDollarSign
} from 'react-icons/fi';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [preferences, setPreferences] = useState({
    email: {
      newProperties: true,
      priceChanges: true,
      favorites: true,
      marketUpdates: true,
      promotions: false
    },
    push: {
      newProperties: true,
      priceChanges: true,
      favorites: true,
      marketUpdates: false,
      promotions: false
    },
    frequency: 'immediate', // immediate, daily, weekly
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  // Load notifications and preferences from localStorage
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('userNotifications');
      const savedPreferences = localStorage.getItem('notificationPreferences');
      
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications));
      }
      
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }, []);

  // Save notifications and preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('userNotifications', JSON.stringify(notifications));
      localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }, [notifications, preferences]);

  // Update unread count
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast notification
    const toastType = notification.type === 'error' ? 'error' : 
                     notification.type === 'warning' ? 'warning' : 'info';
    
    toast[toastType](notification.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    return newNotification.id;
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'newProperty':
        return <FiHome className="w-5 h-5" />;
      case 'priceChange':
        return <FiDollarSign className="w-5 h-5" />;
      case 'favorite':
        return <FiHeart className="w-5 h-5" />;
      case 'marketUpdate':
        return <FiInfo className="w-5 h-5" />;
      case 'promotion':
        return <FiStar className="w-5 h-5" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5" />;
      default:
        return <FiBell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'newProperty':
        return 'text-blue-600 bg-blue-50';
      case 'priceChange':
        return 'text-green-600 bg-green-50';
      case 'favorite':
        return 'text-red-600 bg-red-50';
      case 'marketUpdate':
        return 'text-purple-600 bg-purple-50';
      case 'promotion':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNotificationsByType = (type) => {
    return notifications.filter(notification => notification.type === type);
  };

  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.read);
  };

  const getRecentNotifications = (limit = 10) => {
    return notifications.slice(0, limit);
  };

  const subscribeToPushNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
          });
          
          // Send subscription to server
          console.log('Push notification subscription:', subscription);
          toast.success('Push notifications enabled!');
          return true;
        } else {
          toast.error('Permission denied for push notifications');
          return false;
        }
      } catch (error) {
        console.error('Error subscribing to push notifications:', error);
        toast.error('Failed to enable push notifications');
        return false;
      }
    } else {
      toast.error('Push notifications not supported');
      return false;
    }
  };

  const unsubscribeFromPushNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        
        if (subscription) {
          await subscription.unsubscribe();
          toast.success('Push notifications disabled');
          return true;
        }
      } catch (error) {
        console.error('Error unsubscribing from push notifications:', error);
        toast.error('Failed to disable push notifications');
        return false;
      }
    }
    return false;
  };

  const value = {
    notifications,
    unreadCount,
    preferences,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    getNotificationIcon,
    getNotificationColor,
    formatTimestamp,
    getNotificationsByType,
    getUnreadNotifications,
    getRecentNotifications,
    subscribeToPushNotifications,
    unsubscribeFromPushNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 