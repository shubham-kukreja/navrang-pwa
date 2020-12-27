import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Item from "../components/Item";

function ItemDetails() {
  const { id } = useParams();
  const [details, loading, error] = useDocumentData(
    firestore.doc(`parchi/${id}`),
    { idField: "id" }
  );

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {details && <Item data={details} />}
    </div>
  );
}

export default ItemDetails;
