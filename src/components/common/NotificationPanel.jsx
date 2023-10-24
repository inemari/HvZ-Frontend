import React from 'react';

const NotificationPanel = ({ notifications }) => {
  return (
    // Notification panel container
    <div className="bg-white p-4 rounded shadow">
      {/* Title for the notification panel */}
      <h2 className="text-lg font-semibold">Notifications</h2>
      <ul className="list-disc pl-4">
        {notifications.map((notification, index) => (
          <li key={index} className="text-gray-600">
            {/* List item for each notification */}
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;
