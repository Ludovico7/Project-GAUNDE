import { useDispatch } from 'react-redux';

import { controlActions } from '../../store/redux/control-slice.js';


export default function ConfirmDestinationButton({destination}) {
  const dispatch = useDispatch();


  function clickHandler(){
    dispatch(controlActions.setIsOpen(true));
  }


  return (
    <div className="w-[100vw] h-20 fixed bottom-4 right-0 flex justify-center z-20 md:w-80 md:h-20">
      <button
      className='bg-green-200 w-[90%] h-full'
      onClick={clickHandler}
      >{destination}역 주변 플레이스 &raquo;</button>
    </div>
  );
}












