import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import SavedPlacesLayout from '../components/Places/SavedPlacesLayout';
import SearchFormFallback from '../components/Fallback/SearchFormFallback';
import SavedFallback from '../components/Fallback/SavedFallback';
import PlaceSearchForm from '../components/SearchForm/PlaceSearchForm';
import Header from '../components/Header';
import MapLayout from '../components/Map/MapLayout';
import MapFallback from '../components/Fallback/MapFallback';
import EventMapMarker from '../components/Map/EventMapMarker';
import { savedActions } from '../store/redux/saved-slice';
import { loadPosition } from '../util/location';
import { searchActions } from '../store/redux/search-slice';
import { mapActions } from '../store/redux/map-slice';

const positionQuery = {
  queryKey: ['position'],
  queryFn: () => loadPosition(),
};

export default function PlacesLayout() {
  const { data, isLoading } = useQuery(positionQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedList = useSelector((state) => state.saved.savedList);
  const hasList = savedList.length !== 0;
  const markers = useSelector((state) => state.search.markers);

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        'center',
        JSON.stringify({ lat: +data.lat, lng: +data.lng })
      );
    }
    if (savedList.length === 0) {
      dispatch(searchActions.initRegion());
      dispatch(searchActions.initState());
    } else {
      dispatch(searchActions.initState());
      dispatch(searchActions.initMarkers());
    }
  }, [dispatch, data]);

  let content;

  if (isLoading) {
    content = (
      <>
        <MapFallback />
        <SearchFormFallback />
      </>
    );
  }

  if (data) {
    content = (
      <>
        <MapLayout cent={data}>
          {markers.map((marker) => (
            <EventMapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              marker={marker}
            >
              <div className='mx-auto my-auto text-sm text-gray-700'><a href={marker.url} target='_blank' rel='noreferrer'>상세정보</a></div>
            </EventMapMarker>
          ))}
        </MapLayout>
        <PlaceSearchForm />
      </>
    );
  }

  function toResultHandler() {
    dispatch(savedActions.setSelectedDestination(undefined));
    dispatch(searchActions.initState());
    dispatch(mapActions.initCenter());
    navigate('/result');
  }

  return (
    <div className="w-[100%] h-[100vh] md:h-[calc(100vh-120px)] pb-4">
      <Header title="장소 검색" to=".." />
      <button
        onClick={toResultHandler}
        className={
          savedList.length < 2
            ? 'fixed top-1 md:top-0 right-0 md:right-4 text-slate-400 py-1 px-3 md:py-2 md:px-4 text-xl'
            : 'fixed top-1 md:top-0 right-0 md:right-4 text-blue-500 py-1 px-3 md:py-2 md:px-4 text-xl'
        }
        disabled={savedList.length < 2}
      >
        약속장소 찾기
      </button>
      {!hasList && <SavedFallback />}
      {hasList && <SavedPlacesLayout />}
      {content}
    </div>
  );
}
