import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { savedActions } from '../../store/redux/saved-slice'; 



export default function DestinationButtonLayout({stations}){
  const dispatch = useDispatch();


  function clickHandler(name, coord){
    dispatch(savedActions.setSelectedDestination(name));
    dispatch(savedActions.setSelectedCoord(coord));
  }

  return <div className="w-[100%] flex justify-center items-center h-16 my-0 gap-4 mx-auto bg-green-300 md:h-24">
    {stations.map(item=> <Link
    className="bg-green-200 px-4 py-2 rounded cursor-pointer min-w-fit hover:brightness-95 md:px-5 md:py-3"
     key={item.destIndex} state={{
      dIndex: item.destIndex,
      coord: {lat: item.destY, lng: item.destX}
     }} to={`/result/${item.destName}`}
     onClick={()=>clickHandler(item.destName, {lat: item.destY, lng: item.destX})}
     ><h2 className="m-0 text-black md:text-3xl">{item.destName}</h2></Link>)}
  </div>
}