import { useDispatch } from 'react-redux';
import { savedActions } from '../../store/redux/saved-slice';
import { mapActions } from '../../store/redux/map-slice';
import { searchActions } from '../../store/redux/search-slice';

export default function InfoWindow({ marker, children }) {
  const dispatch = useDispatch();

  function saveHandler(){
    dispatch(savedActions.saveToList(marker));
    dispatch(searchActions.setIsSelected(marker.content));
    dispatch(mapActions.setMarkerCenter(marker.position));
  }

  return (
    <div className='min-w-40 min-h-16 flex flex-col bg-gray-100 rounded-xl shadow-xl hover:cursor-default' >
      <div 
      className="w-full h-fit flex px-2 py-1 gap-8 rounded-t-xl justify-between bg-gray-300"
      >
        <span 
        className='hover:cursor-pointer hover:underline'
        onClick={saveHandler}
        >
        {marker.content}
        </span>
        <div
          className="hover:cursor-pointer text-gray-600"
          onClick={() => dispatch(searchActions.setIsSelected(undefined))}
        >
          닫기
        </div>
      </div>
      {children}
    </div>
  );
}
