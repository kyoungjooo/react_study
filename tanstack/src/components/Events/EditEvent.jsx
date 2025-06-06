import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      //mutate 데이터
      const newEvent = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", id] }); //기존 요청 중단
      const oldEvent = queryClient.getQueryData(["events", id]);
      queryClient.setQueriesData(["events", id], newEvent); //UI에 직접 최신 데이터 반영
      return { oldEvent }; //context로 전달
    },
    onError: (error, data, context) => {
      console.log(context);
      //실패할경우
      queryClient.setQueriesData(["events", id], context.oldEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }
  let content;
  if (isError) {
    <>
      <ErrorBlock title="error" message={error.info?.message} />;
      <div className="form-actions">
        <link to="../" className="button">
          확인
        </link>
      </div>
    </>;
  }

  if (data) {
    content = (
      <>
        <EventForm inputData={data} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      </>
    );
  }
  return <Modal onClose={handleClose}>{content}</Modal>;
}
