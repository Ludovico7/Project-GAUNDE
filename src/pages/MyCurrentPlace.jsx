import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MapLayout from '../components/Map/MapLayout';
import MapFallback from '../components/Fallback/MapFallback';
import PlaceSearchForm from '../components/SearchForm/PlaceSearchForm';
import SearchFormFallback from '../components/Fallback/SearchFormFallback';
import { loadPosition } from '../util/location';
import { searchActions } from '../store/redux/search-slice';

const positionQuery = {
  queryKey: ['position'],
  queryFn: () => loadPosition(),
};

export default function MyCurrentPlace() {
  const { data, isLoading } = useQuery(positionQuery);
  const dispatch = useDispatch();
  const savedList = useSelector(state => state.saved.savedList);


  useEffect(()=>{
    if(data){
      localStorage.setItem('center', JSON.stringify({lat: +data.lat, lng: +data.lng}));
    }
    if(savedList.length === 0){
      dispatch(searchActions.initRegion());
      dispatch(searchActions.initState());
    } else {
      dispatch(searchActions.initState());
      dispatch(searchActions.initMarkers());
    }
  },[dispatch, data])

  let content;

  if (isLoading) {
    content = <>
    <MapFallback />
    <SearchFormFallback/>
    </>;
  }

  if (data) {
    content = <>
    <MapLayout cent={data} level={3}/>
      <PlaceSearchForm />
    </>
  } 

  return (
    <div className='w-[100%] text-center m-0 mb-20 p-0 md:flex md:flex-col md:justify-between md:items-center md:mb-40'>
{/*       <RegionCheckerLayout /> */}
      <section className='grid grid-rows-2 mx-auto mt-12 w-[80%] h-[600px] md:w-[1000px] md:h-[500px] md:grid-cols-2 md:grid-rows-1 '>
        {content}
      </section>
    </div>
  );
}


