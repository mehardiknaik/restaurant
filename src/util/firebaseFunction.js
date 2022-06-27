import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase.config";

const getItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};

export default getItems;
