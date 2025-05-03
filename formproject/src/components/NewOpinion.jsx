import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  const postAction = async (prevFormState, formData) => {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");
    console.log(userName, title, body);
    let errors = [];

    if (title.trim().length < 5) {
      errors.push("제목은 5글자 이상 입력");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("내용을 10글자 이상 300글자 미만 입력해주세요");
    }
    if (!userName.trim()) {
      errors.push("이름을 입력해주세요");
    }
    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          userName,
          title,
          body,
        },
      };
    }
    await addOpinion({ userName, title, body });
    return { errors: null };
  };

  const [formState, formAction] = useActionState(postAction, { errors: null });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="error">
            {formState.errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}
        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
