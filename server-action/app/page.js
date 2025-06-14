import { Suspense } from "react";

import ServerWrapper from "./components/ServerWrapper";

export default function Home() {
  return (
    <main>
      {/* 데이터가 클라이언트에서 처리되는동안 fallback 표시 */}
      <Suspense fallback={<p>loading...</p>}>
        <ServerWrapper />
      </Suspense>
    </main>
  );
}
