// ServerWrapper.tsx (서버 컴포넌트)
import { cache, use } from "react";
import fs from "node:fs/promises";
import UsePromiseDemo from "./UsePromiseDemo";

/*
재사용 가능하고 참조값이 같은 Promise여야 suspend 처리가 가능
cache()를 써서 React가 매번 같은 Promise를 반환하도록 보장
*/
const fetchUsers = cache(async () => {
  const data = await fs.readFile("dummy-db.json", "utf-8");
  const users = JSON.parse(data);
  await new Promise((r) => setTimeout(r, 2000));
  return users;
});

export default function ServerWrapper() {
  const users = use(fetchUsers());

  return <UsePromiseDemo users={users} />;
}
