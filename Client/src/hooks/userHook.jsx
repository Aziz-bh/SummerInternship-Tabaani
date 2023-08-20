import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useSubscribedCourses = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetch(`http://localhost:5000/api/user/${user.uid}/subscribed-courses`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "setSubscribedCourses");
            setSubscribedCourses(data.courses);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
    //sss
    return () => {
      unsubscribe();
    };
  }, [auth]);

  return subscribedCourses;
};

export default useSubscribedCourses;
