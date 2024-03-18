import { useDispatch, useSelector } from 'react-redux';


import { savedActions } from '../../store/redux/saved-slice';
import { mapActions } from '../../store/redux/map-slice';
import { searchActions } from '../../store/redux/search-slice';
import checkMark from '../../public/2738304_accept_approve_check_ok_icon.png';
import plusMark from '../../public/4115237_add_plus_icon.png';


export default function SearchedPlaceItem({ marker }) {
  const dispatch = useDispatch();
  const savedList = useSelector((state) => state.saved.savedList);


  function saveHandler() {
    dispatch(savedActions.saveToList(marker));
    dispatch(searchActions.setIsSelected(marker.content));
    dispatch(mapActions.setMarkerCenter(marker.position));
  }

  function selectHandler() {
    dispatch(searchActions.setIsSelected(marker.content));
    dispatch(mapActions.setMarkerCenter(marker.position));
  }

  return (
    <li
      className="flex relative hover:brightness-95 "
      key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
    >
      <button
        onClick={saveHandler}
        className="absolute top-1 right-1 md:top-0 md:right-0 border-none cursor-pointer px-2 md:px-3 md:py-1 flex justify-center items-center hover:brightness-95"
      >
        <img
          src={
            savedList.find((item) => item.content === marker.content)
              ? checkMark
              : plusMark
          }
          className="w-7 h-7 md:object-cover"
          alt=""
        />
      </button>
      <div className="flex snap-center flex-col justify-start w-[400px] md:w-[100%] min-h-28 md:min-h-32 gap-2 border-slate-400 border p-4 bg-slate-100 rounded-3xl">
        <p className="m-0 p-0 text-start text-black">
          <button
            className="text-lg md:border-none md:bg-transparent md:m-0 md:p-0 cursor-pointer md:text-xl md:hover:underline"
            onMouseOver={() =>
              dispatch(searchActions.setIsHover(marker.content))
            }
            onMouseOut={() => dispatch(searchActions.setIsHover(undefined))}
            onClick={selectHandler}
          >
            {marker.content}
          </button>
        </p>
        <p className="m-0 p-0 text-start text-sm">
          {marker.address ? marker.address : '-'}
        </p>
        <p className="m-0 p-0 text-start text-sm">
          {marker.phone ? marker.phone : '-'}
        </p>
      </div>
    </li>
  );
}
