import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import SavedPlaceItem from './SavedPlaceItem';
import { savedActions } from '../../store/redux/saved-slice';

export default function SavedPlacesLayout() {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.saved.savedList);

  function deleteHandler(place) {
    dispatch(savedActions.deleteFromList(place));
  }

  let content = <span></span>;

  if (places.length > 0) {
    content = places.map((place) => (
      <SavedPlaceItem
        key={place.content}
        place={place}
        onDelete={deleteHandler}
      />
    ));
  }

  return (
    <div className="w-[100%] flex overflow-x-auto justify-center items-center h-16 my-0 mx-auto bg-orange-200 md:h-24 shadow-2xl ">
      <ul className="h-full flex justify-start items-center gap-4 scroll-m-3">
        <AnimatePresence mode="popLayout">{content}</AnimatePresence>
      </ul>
    </div>
  );
}
