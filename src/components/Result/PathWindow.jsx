import { getPathName } from '../../util/util';
import PathInfoCard from './PathInfoCard';

const COLOR = [
  'bg-line1',
  'bg-line2',
  'bg-line3',
  'bg-line4',
  'bg-line5',
  'bg-line6',
  'bg-line7',
  'bg-line8',
  'bg-line9',
];

export default function PathWindow({ path, dep, index }) {
  const info = getPathName(path.startPoint[index]);
  console.log(path.startPoint[index]);
  console.log(info);
  const totalTime = path.startPoint[index].totalTime;

  return (
    <div className="min-h-40 h-fit min-w-40 w-full overflow-auto brightness-110">
      <div className="text-xs text-center text-gray-700">
        &raquo; {path.destName}역 ({totalTime}분)
      </div>
      <div className="w-full h-[0.1rem] bg-gray-500"></div>
      {info.map((inf) => (
       <PathInfoCard subPath={inf} color={COLOR[inf.line - 1]} />
      ))}
      <div className='bg-green-200 rounded-lg mb-1 pl-2'>
        {path.destName}역
      </div>
    </div>
  );
}


