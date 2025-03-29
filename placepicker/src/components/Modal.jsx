import { createPortal } from "react-dom";

export default function Modal({ children, open }) {
  return createPortal(
    <dialog className="modal" open={open}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
