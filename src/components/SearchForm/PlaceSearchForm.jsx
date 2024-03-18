import { useDispatch } from 'react-redux';

import { searchActions } from '../../store/redux/search-slice';
import SearchedPlacesList from '../Places/SearchedPlacesList';

export default function PlaceSearchForm() {
  const dispatch = useDispatch();

  function submitHandler(event) {
    event.preventDefault();
    dispatch(searchActions.initKeyword());
    const fd = new FormData(event.target);
    const inputText = fd.get('searchPlace');
    dispatch(searchActions.setKeyword(inputText));
    dispatch(searchActions.setIsSelected(undefined));
  }


  return (
        <div className='md:w-fit w-[100vw] flex flex-col absolute bottom-4 right-0 md:top-[150px] md:right-4 z-10'>
          <form method="POST" onSubmit={submitHandler} className='flex w-[95%] border-solid mx-auto md:w-[300px] relative z-20'>
            <input
              type="text"
              id="searchPlace"
              name="searchPlace"
              placeholder="검색"
              className='border-[0.5px] border-slate-400 rounded-2xl outline-none w-[100%] h-10 pl-3 bg-slate-200 text-xl focus:brightness-95'
            />
            <button className='absolute top-0 right-0 w-[10%] h-[100%] border-[0.5px] border-slate-400 bg-slate-200 rounded-r-2xl '>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <SearchedPlacesList />
        </div>
  );
}
