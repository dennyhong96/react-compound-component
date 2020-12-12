import { useEffect, useState } from "react";

import { firestore } from "../lib/firebase/firebase.prod";

const useContent = (target) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await firestore.collection(target).get();
        setContent(querySnapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("useContent ERROR", error);
      }
    })();
  }, [target]);

  return { [target]: content };
};

export default useContent;
