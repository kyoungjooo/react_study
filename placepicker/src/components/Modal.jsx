import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open }) {
  const dialogRef = useRef(); //ref 자체는 렌더링 결과에 영향을 주는 게 아님
  console.log(dialogRef.current); //undefined
  //렌더링이 완료된 후에 dialogRef.current에 접근 가능

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal(); //dialogRef.current가 null이 아님
    } else {
      dialogRef.current.close();
    }
  }, [open]); //open이 바뀔 때마다 실행

  return createPortal(
    //화면에 보이는 내용이나 JSX 구조 자체를 변경하지 않는다
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
