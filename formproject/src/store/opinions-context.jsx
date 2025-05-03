import { createContext, useEffect, useState } from "react";

//Context의 초기값을 정의
export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

//이건 Context를 실제로 구현하고 제공하는 Provider 컴포넌트
export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  //포넌트가 처음 렌더링될 때 서버에서 의견 데이터를 받아와서 opinions 상태로 저장
  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id) {
    //fetch()는 원래 Promise를 반환하는 비동기 함수
    //"이 요청이 끝날 때까지 기다렸다가, 그 다음 줄 (setOpinions)을 실행해라!" 라는 의미
    const res = await fetch(`http://localhost:3000/opinions/${id}/upvote`, {
      method: "POST",
    });
    if (!res.ok) {
      return;
    }
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id) {
    const res = await fetch(`http://localhost:3000/opinions/${id}/downvote`, {
      method: "POST",
    });
    if (!res.ok) {
      return;
    }
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  //실제로 Context를 통해 전달되는 전역 상태 및 기능
  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
