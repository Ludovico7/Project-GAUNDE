import { findOptimalMeetingPoint } from "./algorithm";
import fetchData from '../util/dummy_integration.json'

export function getCoord(places){
  const coords = places.map(place => place.position);
  const meetingPoint = findOptimalMeetingPoint(coords);

  return meetingPoint;
}

export function sortByNearestPlace(places){

  const sortedPlace = places.sort((a,b) => a.distance - b.distance);

  return sortedPlace;
}

export function getDestData(data){
  const destNames = getDestNames(data);
  const destCoords = getDestCoords(data);
  const cent = getCent(destCoords);

  return {destNames, destCoords, cent};
}

export function getDepData(data){
  const depNames = getDepNames(data);
  const depCoords = getDepCoords(data);

  return {depNames, depCoords};
}

export function getPathInfo(dest){
  const result = [];

  dest.startPoint.forEach(function(item){

  })
}

export function getPathName(path){
  const subStationName = [];
  const busStationName = [];
  const pathData = [];
  const busLines = [];
  const subLines = [];
  let isBus = false;

  path.subPathList.forEach(function(item){
    if(item.trafficType === 1){
      const temp = [];
      subLines.push(item.lane[0].subwayCode);
      item.passStopList.forEach(function(station){
        temp.push(station.stationName + '역');
      })
      subStationName.push(temp);
      pathData.push({
        trafficType: item.trafficType,
        stationsNames: temp,
        line: item.lane[0].subwayCode
      })
    } else if(item.trafficType === 2){
      isBus = true;
      const temp = [];
      item.lane.map(lane=> busLines.push(lane.busNo));
      item.passStopList.forEach(function(station){
        temp.push(station.stationName);
      })
      busStationName.push(temp);
      pathData.push({
        trafficType: item.trafficType,
        stationsNames: temp,
        line: busLines
      })
    } else{
      pathData.push({
        trafficType: item.trafficType,
        distance: item.distance
      })

    }
  })
  console.log(pathData)

  return pathData;

}

export default function getPath(path, index){
  const destPath = [];

  for(let i = 0; i< path[index].startPoint.length; i++){
    const temp = [];
    path[index].startPoint[i].graphPosList.map(graph=> graph.section[0].graphPos.map(gr=> temp.push({lat: gr.y, lng: gr.x})));

    destPath.push(temp);
  }

  return destPath;
}

function getDestNames(json){
  const destName = [];
  
  json.map(dest => destName.push(dest.destName + '역'));

  return destName;
}

function getDestCoords(json){
  const destCoords = [];

  json.map(dest => destCoords.push({lat: dest.destY, lng: dest.destX}))

  return destCoords;
}

function getDepNames(json){
  const depName = [];

  json.startPoint.map(dep => depName.push(dep.depName + '역'));

  return depName;
}

function getDepCoords(json){
  const depCoords = [];

  json.startPoint.map(dep => depCoords.push({lat: dep.depY, lng: dep.depX}));

  return depCoords;
}

function getCent(arr){
  let latSum = 0;
  let lngSum = 0;

  for(let i=0; i<arr.length; i++){
    latSum += arr[i].lat;
    lngSum += arr[i].lng;
    }

  return {lat: latSum / arr.length, lng: lngSum / arr.length}
}