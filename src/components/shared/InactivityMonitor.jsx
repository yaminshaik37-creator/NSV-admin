
const InactivityMonitor = () => {
  return (
    < > </>
  )
}

export default InactivityMonitor
// import { useEffect, useRef } from 'react';
// import { throttle } from 'lodash';
// import { useRouter } from 'next/navigation';

// const InactivityMonitor = () => {
//   const router = useRouter()
//   const timeoutRef = useRef(null);

//   const handleUserActivity = () => {
//     // Reset the timeout whenever there's any user activity
//     clearTimeout(timeoutRef.current);
//     startInactivityTimer();
//   };

//   const startInactivityTimer = () => {
//     timeoutRef.current = setTimeout(() => {
//       onInactivity();
//     }, 12 * 60 * 60 * 1000); // 12 hours in milliseconds
//   };

//   const onInactivity = () => {
//     router.push('/logout')
//   };

//   useEffect(() => {
//     // Throttle the handleUserActivity function to fire at most once every 1 second (1000 ms)
//     const throttledUserActivity = throttle(handleUserActivity, 5000);

//     window.addEventListener("mousemove", throttledUserActivity);
//     window.addEventListener("keydown", throttledUserActivity);
//     window.addEventListener("scroll", throttledUserActivity);
//     window.addEventListener("click", throttledUserActivity);

//     startInactivityTimer();

//     return () => {
//       window.removeEventListener("mousemove", throttledUserActivity);
//       window.removeEventListener("keydown", throttledUserActivity);
//       window.removeEventListener("scroll", throttledUserActivity);
//       window.removeEventListener("click", throttledUserActivity);
//       clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   return <></>;
// };

// export default InactivityMonitor;
