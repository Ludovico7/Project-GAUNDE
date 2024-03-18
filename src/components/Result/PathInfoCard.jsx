export default function PathInfoCard({ subPath, color }) {
  console.log(color);
  return (
    <div className={`w-full ${color} relative rounded-lg my-1 hover:cursor-default`}>
      {subPath.trafficType === 1 && (
        <>
          <div className="absolute text-gray-300 text-xs top-1 right-2">
            {subPath.line}호선
          </div>
          <div className="py-1">
            {subPath.stationsNames.map((station, index) => (
              <>
              <div className="pl-1 text-start">{station}
              {index !== subPath.stationsNames.length - 1 && (<div
              className="text-xs pl-2"
              >
                &#8595;
                </div>)}
              </div>

              </>
              
            ))}
          </div>
        </>
      )}
      {subPath.trafficType === 2 && (
        <div className="brightness-110">
          <div className="justify-center mt-2">

            <div className="my-2 bg-gray-400 rounded-lg flex flex-col">
            <div className="flex gap-2 justfiy-start my-2 ml-2">
              {subPath.line.map((line, index) => (
                <div className="flex text-gray-600 text-sm bg-gray-300 px-1 rounded-lg">
                  {line}
                </div>
              ))}
            </div>
              {subPath.stationsNames.map((station) => (
                <div className="px-2 py-1 text-start">{station}</div>
              ))}
            </div>
          </div>
        </div>
      )}
      {subPath.trafficType === 3 && (
      <div className="my-2 rounded-lg">
        <div className="text-start text-gray-600 text-xs px-3">
         &#8595; 도보 {subPath.distance}m 이동
        </div>

      </div>)}
    </div>
  );
}
