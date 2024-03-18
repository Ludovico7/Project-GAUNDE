import { json } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

const { kakao } = window;

const API_KEY = process.env.REACT_APP_API_KEY;

export const queryClient = new QueryClient();

export async function fetchPlaceNearStation(coord) {
  if(isNaN(coord.lat) || isNaN(coord.lng)){
    throw new Error('잘못된 접근입니다. 다시 시도해 주세요')
  }
  const url = `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=SW8&x=${coord.lng}&y=${coord.lat}&radius=20000`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('error...'
    );
  }

  const resData = await response.json();
  let newArr = [];
  let nameMap = {};
  resData.documents.forEach((item) => {
    let name = item.place_name.split(' ')[0];
    let position = { lat: +item.y, lng: +item.x };

    if (!nameMap[name]) {
      nameMap[name] = true;
      newArr.push({ name: name, position: position });
    }
  });

  if (newArr.length < 2) {
    return newArr;
  } else {
    return newArr.slice(0, 2);
  }
}

export async function fetchPlacesbyCategory(
  category,
  coord,
  dispatch,
  searchActions,
  mapActions
) {
  const places = [];
  const cat = ['CE7', 'FD6', 'CT1']
  for(const ctg of cat){
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=${ctg}&x=${coord.lng}&y=${coord.lat}&radius=1000`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'failed to fetch place by category' },
      { status: 1000 }
    );
  }

  const resData = await response.json();
  let markers = [];
  const bounds = new kakao.maps.LatLngBounds();
  resData.documents.forEach((place) => {
    const marker = {
      id: place.id,
      content: place.place_name,
      distance: +place.distance,
      url: place.place_url,
      address: place.road_address_name,
      phone: place.phone,
      position: {
        lat: place.y,
        lng: place.x,
      },
    };
    markers.push(marker);
    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
  });
  places.push(markers)
  }
  /* const url = `https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=${category}&x=${coord.lng}&y=${coord.lat}&radius=1000`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'failed to fetch place by category' },
      { status: 1000 }
    );
  }

  const resData = await response.json();
  let markers = [];
  const bounds = new kakao.maps.LatLngBounds();
  resData.documents.forEach((place) => {
    const marker = {
      id: place.id,
      content: place.place_name,
      distance: +place.distance,
      url: place.place_url,
      address: place.road_address_name,
      phone: place.phone,
      position: {
        lat: place.y,
        lng: place.x,
      },
    };
    markers.push(marker);
    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
  });

  dispatch(searchActions.setMarkers(markers));
  dispatch(searchActions.setPlaces(markers));
  dispatch(mapActions.setBounds(bounds));

  console.log(markers); */
  return places;
}

export const fetchSelectedCoords = async (coords) => {
  let url = 'dummy'
  
  const coordData = {places : coords.map(item => {return {lat: +item.position.lat, lng: +item.position.lng}})}
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coordData)
  });

  if(!response.ok){
    throw json({message: 'cant fetch coordinate data'}, {status: 500});
  };

  const resData = await response.json();

  

}