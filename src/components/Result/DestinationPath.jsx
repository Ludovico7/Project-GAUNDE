import { Polyline } from 'react-kakao-maps-sdk';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MapLayout from '../Map/MapLayout';
import PathWindow from './PathWindow';
import ConfirmDestinationButton from './ConfirmDestinationButton';
import StationMapMarker from './StationMapMarker';
import fetchPath from '../../util/dummy_integration.json'
import { savedActions } from '../../store/redux/saved-slice';
import getPath, { getDestData, getDepData, getPathInfo, getPathName} from '../../util/util';
import destMarker from '../../public/299087_marker_map_icon.png';
import startMarker from '../../public/3440906_map_marker_navigation_pin_icon.png';

const COLOR = ['#69db7c', '#212529'];

export default function DestinationPath() {
  let level = 8;
  const dispatch = useDispatch();
  const [isPath, setIsPath] = useState(null);
  const destName = useSelector(state=>state.saved.selectedDestination);
  const destCoord = useSelector(state => state.saved.selectedCoord);

  const { place } = useParams();
  const location = useLocation();
  const {dIndex, coord} = location.state;
  const paths = getPath(fetchPath, dIndex);
  const {destNames, destCoords, cent} = getDestData(fetchPath);
  const {depNames, depCoords} = getDepData(fetchPath[dIndex]);
  console.log(destName)
  
  useEffect(()=>{
    setIsPath(prev => {return null});
    dispatch(savedActions.setSelectedCoord(coord));
  },[coord, dispatch, destName])

  function clickHandler(index) {
    setIsPath((prev) => {
      if(prev === index){
        return null;
      } else {
        return index;
      }
    });
  }

  console.log(paths.length)



  return (
    <>
      <MapLayout cent={destCoord} level={8}>
        {paths.map((path) => (
          <Polyline
            path={path}
            strokeWeight={6}
            strokeColor={'#69db7c'}
            strokeOpacity={1}
            strokeStyle={'solid'}
          />
        ))}
        <StationMapMarker
          position={destCoords[dIndex]}
          image={destMarker}
          isDest={true}
        >
          <div className="min-w-fit min-h-fit flex flex-col text-center px-3 py-1 bg-green-200 rounded-xl shadow-xl hover:cursor-pointer">
            {destNames[dIndex]}
          </div>
        </StationMapMarker>
        {depCoords.map((coord, index) => (
          <StationMapMarker
            position={coord}
            image={startMarker}
            isDest={false}
          >
            <div className="min-w-fit min-h-fit flex flex-col text-center px-3 py-1 bg-blue-200 rounded-xl shadow-xl hover:cursor-default">
              <span 
              className='hover:underline hover:cursor-pointer'
              onClick={()=>clickHandler(index)}>
                {
                  depNames[index]
                }
              </span>
              {isPath === index && (
                <PathWindow
                  path={fetchPath[dIndex]}
                  index={index}
                  dep={depNames[index]}
                />
              )}
            </div>
          </StationMapMarker>
        ))}
      </MapLayout>
      <ConfirmDestinationButton destination={place} />
    </>
  );
}
