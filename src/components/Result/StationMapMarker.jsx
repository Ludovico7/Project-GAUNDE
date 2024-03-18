import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";


export default function StationMapMarker({position, image, isDest, children}){

  return <>
    <MapMarker
    position={position}
    clickable={true}
    image={{
      src: image,
      size: {
        width: 44,
        height: 48,
      },
    }}
    />
    <CustomOverlayMap
      position={position}
      clickable={true}
      yAnchor={isDest ? 2.5 : 2.3}
      zIndex={3000}
    >
      {children}
    </CustomOverlayMap>
  </>
}