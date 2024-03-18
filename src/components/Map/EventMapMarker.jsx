import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';

import { searchActions } from '../../store/redux/search-slice';
import { mapActions } from '../../store/redux/map-slice';
import InfoWindow from './InfoWindow';
import selectedMarker from '../../public/299087_marker_map_icon.png';
import defaultMarker from '../../public/3440906_map_marker_navigation_pin_icon.png';

export default function EventMapMarker({ marker, children }) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.search.isSelected);
  const isHover = useSelector(state => state.search.isHover)

  let content = null;

  if(isHover === marker.content){
     content = (
      <CustomOverlayMap
        position={{ lat: marker.position.lat, lng: marker.position.lng }}
        yAnchor={1.6}
        clickable={true}
      >
        <InfoWindow marker={marker}/>
      </CustomOverlayMap>
    );
  }

  if (isSelected === marker.content) {
    //dispatch(searchActions.setIsHover(undefined));
    content = (
      <CustomOverlayMap
        position={{ lat: marker.position.lat, lng: marker.position.lng }}
        yAnchor={1.8}
        clickable={true}
      >
        <InfoWindow marker={marker}>
        {children}
        </InfoWindow>
      </CustomOverlayMap>
    );
  }

  function clickHandler() {
    dispatch(searchActions.setIsSelected(marker.content));
    dispatch(mapActions.setMarkerCenter(marker.position));
  }

  return (
    <>
      <MapMarker
        position={{ lat: marker.position.lat, lng: marker.position.lng }}
        clickable={true}
        image={
          isSelected === marker.content
            ? {
                src: selectedMarker,
                size: {
                  width: 44,
                  height: 48,
                },
              }
            : {
                src: defaultMarker,
                size: {
                  width: 42,
                  height: 46,
                },
              }
        }
        zIndex={isSelected === marker.content ? 1000 : 0}
        onClick={() => clickHandler()}
        onMouseOver={()=>{
          dispatch(searchActions.setIsHover(marker.content));
        }}
        onMouseOut={()=>{
          dispatch(searchActions.setIsHover(undefined))
        }}
      />
        {content}
    </>
  );
}

/* if (isHover !== marker.content && isSelected !== marker.content) {
  content = null;
}

if (isHover === marker.content && isSelected !== marker.content) {
  content = <div className={classes.eventMarkerHover} >{marker.content}</div>;
}

if (isHover !== marker.content && isSelected === marker.content) {
  content = (
    <div className={classes.eventMarkerClick}>
      <a href={marker.url} target="_blank" rel="noreferrer">
        {marker.content}
      </a>
    </div>
  );
}

if (isHover === marker.content && isSelected === marker.content) {
  content = (
    <div className={classes.eventMarkerClick}>
      <a href={marker.url} target="_blank" rel="noreferrer">
        {marker.content}
      </a>

    </div>
  );
} */
