import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);
  //enteredValue 훅 내부에서 갖고 있는 현재 값(실제 인자 값)

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };
  const handleInputBlur = () => {
    setDidEdit(true);
  };
  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    //didEdit true , 해당 값이 유효하지 않을 때 hasError true
    hasError: didEdit && !valueIsValid,
  };
}
