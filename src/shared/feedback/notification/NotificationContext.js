// Code is Commented Because it works on development Mode 


// import React, { createContext, useContext, useState } from "react";
// import NotificationBanner from "../components/common/NotificationBanner";

// const NotificationContext = createContext();

// export const useNotification = () => useContext(NotificationContext);

// export const NotificationProvider = ({ children }) => {
//   const [notification, setNotification] = useState({ message: "", visible: false });

//   const showNotification = (message) => {
//     setNotification({ message, visible: true });
//   };

//   const hideNotification = () => {
//     setNotification({ ...notification, visible: false });
//   };

//   return (
//     <NotificationContext.Provider value={{ showNotification }}>
//       {children}
//       <NotificationBanner
//         message={notification.message}
//         visible={notification.visible}
//         onHide={hideNotification}
//       />
//     </NotificationContext.Provider>
//   );
// };