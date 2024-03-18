

import fetchData from '../../util/dummy_integration.json';

import { getDestData } from '../../util/util';

import MapLayout from '../Map/MapLayout';
import destMarker from '../../public/299087_marker_map_icon.png';
import StationMapMarker from './StationMapMarker';

export default function DestinationStation() {
  const {destNames, destCoords,cent} = getDestData(fetchData);
  
  return (
    <>
      <MapLayout cent={cent} level={7}>
        {destCoords.map((dest, index) => (
          <StationMapMarker position={dest} image={destMarker} isDest={true}>
            <div className="min-w-40 min-h-fit flex flex-col text-center px-3 py-1 bg-green-200 rounded-xl shadow-xl hover:cursor-default">
              {destNames[index]}
            </div>
          </StationMapMarker>
        ))}
      </MapLayout>
    </>
  );
}
