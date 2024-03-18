import { Map, Polyline } from 'react-kakao-maps-sdk';

import { useDispatch, useSelector } from 'react-redux';

import { mapActions } from '../../store/redux/map-slice';
import EventMapMarker from '../Map/EventMapMarker';

export default function MapLayout({ cent, level, children }) {
  const dispatch = useDispatch();
  const markers = useSelector((state) => state.search.markers);
  const markerCenter = useSelector((state) => state.map.markerCenter);

  function mapCreateHandler(map) {
    dispatch(mapActions.setMap(map));
  }

  return (
    <Map
      id="map"
      center={markerCenter ? markerCenter : cent}
      style={{ width: '100%', height: '100%' }}
      level={level}
      onCreate={mapCreateHandler}
    >
      {children}
    </Map>
  );
}
