import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Map } from 'react-kakao-maps-sdk';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import MapLayout from '../Map/MapLayout';
import StationMapMarker from '../Result/StationMapMarker';
import EventMapMarker from '../Map/EventMapMarker';
import { savedActions } from '../../store/redux/saved-slice';
import { searchActions } from '../../store/redux/search-slice';
import { mapActions } from '../../store/redux/map-slice';
import { fetchPlacesbyCategory } from '../../util/http';
import startMarker from '../../public/3440906_map_marker_navigation_pin_icon.png';

const categoryQuery = {
  queryKey: 'category',
  queryFn: () => {},
};

const CATEGORY = ['카페', '음식점', '엔터테인먼트'];

const PathFinderModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const coord = useSelector((state) => state.saved.selectedCoord);
  const category = useSelector((state) => state.search.category);
  const isHover = useSelector(state => state.search.isHover);
  const isSelected = useSelector(state => state.search.isSelected);
  const cent = useSelector(state => state.map.markerCenter);

  const [ctgIndex, setCtgIndex] = useState(undefined);
  console.log(ctgIndex);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['category', coord],
    queryFn: () =>
      fetchPlacesbyCategory(
        CATEGORY,
        coord,
        dispatch,
        searchActions,
        mapActions
      ),
  });
  let content = null;

  function categoryClickHandler(category, index) {
    dispatch(searchActions.setIsSelected(undefined));
    dispatch(searchActions.setCategory(category));
    dispatch(mapActions.setMarkerCenter(coord))
    setCtgIndex((prev) => {
      return index;
    });
  }

  function placeClickHandler(marker) {
    dispatch(searchActions.setIsSelected(marker.content));
    dispatch(mapActions.setMarkerCenter(marker.position));
  }

  if (data) {
    content = (
      <ReactModal isOpen={isOpen} onRequestClose={onClose}>
        <div className="w-full h-full">
          <div className="w-full h-full flex ">
            <Map
              id="placeMap"
              center={isSelected ? cent : coord}
              style={{ width: '50%', height: '100%' }}
              level={4}
            >
              {category &&
                ctgIndex >= 0 &&
                data[ctgIndex].map((marker) => (
                  <EventMapMarker
                    marker={marker}
                  >
                    <div className='mx-auto my-auto text-sm text-gray-700'><a href={`https://map.kakao.com/link/to/${marker.id}`} target='_blank' rel='noreferrer'>길찾기</a></div>
                  </EventMapMarker>
                ))}
            </Map>
            <div className="w-1/2 bg-blue-100">
              <div className="w-full flex justify-center gap-4 items-center h-24 bg-blue-300">
                {CATEGORY.map((category, index) => (
                  <div
                    className="bg-blue-500 text-xl px-8 py-4 rounded-lg cursor-pointer hover:brightness-95"
                    onClick={() => categoryClickHandler(category, index)}
                  >
                    {category}
                  </div>
                ))}
              </div>
              <div className="my-3 mx-3 grid grid-cols-3 gap-4">
                {ctgIndex >= 0 &&
                  data[ctgIndex].map((place) => (
                    <div className={
                      isSelected === place.content ? 
                      "bg-green-200 flex flex-col gap-1 pb-2 rounded-xl shadow-xl -translate-y-1" : 
                      "bg-blue-200 flex flex-col gap-1 pb-2 rounded-xl shadow-md"
                    }>
                      <span className={
                        isSelected === place.content ? 
                        'bg-green-300 pl-1 rounded-t-xl py-1 text-xl hover:cursor-pointer hover:underline shadow-xl -translate-y-1' : 
                        'bg-blue-300 pl-1 rounded-t-xl py-1 text-xl hover:cursor-pointer hover:underline shadow-md'
                      }
                      onClick={()=>placeClickHandler(place)}
                      onMouseOver={()=>{
                        dispatch(searchActions.setIsHover(place.content));
                      }}
                      onMouseOut={()=>{
                        dispatch(searchActions.setIsHover(undefined));
                      }}
                      >{place.content}</span>
                      <span className='pl-1'>{place.address}</span>
                      <span className="text-xs text-gray-500 pl-1">
                        목적지에서 {place.distance}m
                      </span>
                      {place.phone ? (
                        <span className='pl-1'>{place.phone}</span>
                      ) : (
                        <span>-</span>
                      )}
                      {place.url && <Link className='pl-1 text-sm text-gray-600 hover:underline hover:cursor-pointer' to={place.url}>상세보기</Link>}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }

  return <div>{content}</div>;
};

export default PathFinderModal;
