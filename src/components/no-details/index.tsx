import React from "react";

export default function NoDetails() {
  return (
    <div>
      <h2>Uh-uh...........</h2>
      <h3>No details found for the given id</h3>
      <div>This (may) happend because:</div>
      <ul>
        <li>Given id belongs to admin</li>
        <li>No user is registered with this id</li>
      </ul>
    </div>
  );
}
