"use client";

import { useState } from "react";

export default function UsePromiseDemo({ users }) {
  const [count, setCount] = useState(0);

  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <span>{count}</span>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
