import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DestinationButtonLayout from '../components/Result/DestinationButtonLayout';
import Header from '../components/Header';
import PathFinderModal from '../components/Share/PathFinderModal';
import start2 from '../util/dummy_1.json'
import fetchPath from '../util/dummy_integration.json'
import { controlActions } from '../store/redux/control-slice';

const destinationQuery = {
  queryKey: ['destination'],
};

export default function DestinationPage() {
  const isOpen = useSelector(state => state.control.isOpen);
  const dispatch = useDispatch();


  function closeHandler(){
    dispatch(controlActions.setIsOpen(false));
    
  }

  return (
    <div className="w-[100%] h-[100vh] mx-auto">
      {isOpen && <PathFinderModal isOpen={isOpen} onClose={closeHandler}/>}
      <Header title="약속장소 추천" to="/places" />
      <DestinationButtonLayout stations={fetchPath}/>
      <Outlet/>
    </div>
  );
}
