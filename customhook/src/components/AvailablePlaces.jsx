import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

//거리를 기반으로 장소를정렬하는 함수
async function fetchSortedPlaces() {
  //콜백 기반 비동기 API: 어떤 작업이 끝난 뒤 실행할 함수(콜백 함수)를 미리 넘겨주는 방식
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    //navigator.geolocation.getCurrentPosition이 콜백 기반 비동기 API이기 때문
    //(position) => {} 콜백 함수
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlaces,
    isFetching,
    error,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
