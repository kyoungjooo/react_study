import { useActionState } from "react";
import {
  hasMinLength,
  isEmail,
  isEqualToOtherValue,
  isNotEmpty,
} from "../util/validation";

export default function Signup() {
  const signupAction = (prevFormState, formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const option = formData.get("terms");
    const selected = formData.getAll("acquisition");

    let errors = [];

    if (!isEmail(email)) {
      errors.push("유효하지 않은 이메일");
    }
    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("비밀번호를 6글자 이상 입력");
    }
    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push("비밀번호 일치하지 않음");
    }
    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
      errors.push("성과 이름 모두 입력해주세요");
    }
    if (!role) {
      errors.push("옵션을 선택해주세요");
    }
    if (!option) {
      errors.push("필수동의를 선택해주세요");
    }
    if (selected.length === 0) {
      errors.push("체크박스를 선택해주세요");
    }
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          role,
          option,
          selected,
        },
      };
    }
    return { errors: null };
  };

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });
  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.lastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultValue={formState.enteredValues?.selected.includes("google")}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultValue={formState.enteredValues?.selected.includes("friend")}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultValue={formState.enteredValues?.selected.includes("other")}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultValue={formState.enteredValues?.option}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      )}
      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
