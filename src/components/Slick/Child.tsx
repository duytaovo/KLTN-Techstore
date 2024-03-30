import { ReactNode } from "react";

function Child({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default Child;
