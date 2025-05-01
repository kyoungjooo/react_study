import { useState } from "react";
import Input from "./Input";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");
  const passwordIsInvalid =
    didEdit.password && !enteredValues.password.length < 6;

  const handleInputBlur = (name) => {
    setDidEdit((prevEdit) => ({ ...prevEdit, [name]: true }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(enteredValues);
  };

  const handleInputChange = (name, value) => {
    setEnteredValues((prev) => ({ ...prev, [name]: value }));
    setDidEdit((prevEdit) => ({ ...prevEdit, [name]: false }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          value={enteredValues.email}
          onBlur={() => handleInputBlur("email")}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={emailIsInvalid && "이메일 형식에 맞게 입력해주세요"}
        />

        <Input
          id="password"
          type="password"
          name="password"
          label="password"
          value={enteredValues.password}
          onBlur={() => handleInputBlur("password")}
          onChange={(e) => handleInputChange("password", e.target.value)}
          error={passwordIsInvalid && "비밀번호를 6글자 이상 입력해주세요"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
