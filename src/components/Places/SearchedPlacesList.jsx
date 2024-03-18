import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { searchActions } from '../../store/redux/search-slice';
import { mapActions } from '../../store/redux/map-slice';
import SearchedPlaceItem from './SearchedPlaceItem';
import { searchPlacesByKeywordSearch } from '../../util/location';



export default function SearchedPlacesList() {
  const dispatch = useDispatch();
  const inputText = useSelector((state) => state.search.keyword);
  const map = useSelector((state) => state.map.map);
  const markers = useSelector((state) => state.search.markers);
  const region = useSelector((state) => state.search.region);

  useEffect(() => {
    searchPlacesByKeywordSearch(
      map,
      inputText,
      region,
      dispatch,
      searchActions,
      mapActions
    );
  }, [map, inputText, dispatch]);

  return (
    <div id='list' 
    className="w-[100vw] md:w-[300px] overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto md:h-full md:after:bg-slate-200 md:after:blur-xl  md:after:absolute md:after:top-0 md:after:w-full md:after:h-14 md:after:z-10">
      <ul className="flex px-4 md:px-0 snap-x pt-4 md:pt-8 snap-mandatory md:flex-col md:h-full overflow-x-scroll list-none m-0 p-0 gap-4">
        {markers &&
          markers.map((marker) => (
            <SearchedPlaceItem
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              marker={marker}
            />
          ))}
      </ul>
    </div>
  );
}

