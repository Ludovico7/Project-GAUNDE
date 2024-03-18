import { useDispatch } from 'react-redux';
import { mapActions } from '../../store/redux/map-slice';
import { searchActions } from '../../store/redux/search-slice';

import plusMark from '../../public/4115237_add_plus_icon.png';
import { savedActions } from '../../store/redux/saved-slice';

export default function ActivityListItem({ place, name }) {
  const dispatch = useDispatch();
  function clickHandler() {
    dispatch(searchActions.setIsSelected(place.content));
    dispatch(mapActions.setMarkerCenter(place.position));
  }

  function confirmHandler(){
    dispatch(savedActions.setSelectedDestination(place));
  }

  return (
    <li className='flex bg-blue-300 relative hover:brightness-95'>
      <div className='flex flex-col justify-start w-[100%] min-h-28 md:min-h-32 gap-3 pl-1'>
        <div className='w-[90%] border-none flex items-start justify-between gap-2 m-0 p-0'>
          <button
          className='border-none bg-transparent h-fit text-xl m-0 p-0 text-start cursor-pointer hover:underline md:text-2xl'
            onClick={clickHandler}
            onMouseOver={() =>
              dispatch(searchActions.setIsHover(place.content))
            }
            onMouseOut={() => dispatch(searchActions.setIsHover(undefined))}
          >
            {place.content}
          </button>
          <p className='m-0 mt-1 min-w-fit p-0 text-sm text-gray-500'>
            {name}에서 {place.distance}m
          </p>
        </div>
        <p className='m-0'>{place.address}</p>
        <p className='m-0'>{place.phone ? place.phone : '_'}</p>
        
      </div>
      <button onClick={confirmHandler} className='absolute top-0 right-0 border-none h-fit bg-blue-300 cursor-pointer flex justify-center items-center'>
        <img className='w-7 h-7 object-cover' src={plusMark} alt="" />
      </button>
      <span className='w-[100%] h-1 bg-gray-500 absolute bottom-0'></span>
    </li>
  );
}
