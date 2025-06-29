import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const TestFirestorePage: React.FC = () => {
  const handleAddDoc = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: "test!",
        createdAt: new Date(),
      });
      console.log("Document created: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return <button onClick={handleAddDoc}>test!</button>;
};

export default TestFirestorePage;
