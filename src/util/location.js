const {kakao} = window;

export function loadPosition() {
  if(localStorage.getItem('center')){
    return JSON.parse(localStorage.getItem('center'))
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      ()=>{
        reject({
          lat: 37.575843,
          lng: 126.977380
        })
      }
    );
  });
}


export function searchPlacesByKeywordSearch(map, inputText, region, dispatch, searchActions, mapActions){
  const ps = new kakao.maps.services.Places();
  if (!map) {
    return;
  }
  
  ps.keywordSearch(inputText, (data, status)=>{
    if(status === kakao.maps.services.Status.OK){
      const bounds = new kakao.maps.LatLngBounds();
      let markers = [];
        for (let i = 0; i < data.length; i++) {
          if(            !data[i].road_address_name.includes('서울') &&
          !data[i].road_address_name.includes('경기') &&
          !data[i].road_address_name.includes('인천')){continue}

          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
            address: data[i].road_address_name,
            url: data[i].place_url,
            phone: data[i].phone,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        if(markers.length === 0){
          alert('수도권(서울, 경기, 인천) 지역만 가능합니다!');
          return;
        }
        dispatch(searchActions.setMarkers(markers));
        dispatch(mapActions.setBounds(bounds));
    }
  })
}

export function refactorPath(start){
  //const startingPoint = {lat: start.depX, lng: start.depY};
  const pathCoord = [];
  start.path.map(item => 
    item.passStopList.stations.map(coord=> pathCoord.push({lat: coord.stationY, lng: coord.stationX}))
  );

  return pathCoord;
}

export function refactor2(graph){
  const path1 = [];
  const path2 = [];
  const {lane} = graph.result;
  lane[0].map(lane=> lane.section[0].graphPos.map(graph=> path1.push({lat:graph.y, lng:graph.x})));
  lane[1].map(lane=> lane.section[0].graphPos.map(graph=> path2.push({lat: graph.y, lng: graph.x})));
  return [path1, path2];
}