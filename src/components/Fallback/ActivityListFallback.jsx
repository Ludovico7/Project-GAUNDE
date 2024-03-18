
import fallbackImage from '../../public/undraw_destination_re_sr74.svg'

export default function ActivityListFallback(){

  return <div className='w-[100%] h-[100%] bg-blue-300 flex flex-col justify-center items-center'>
    <p className='text-gray-500 text-2xl text-opacity-50'>카테고리를 선택하세요!</p>
    <img src={fallbackImage} className='ld ld-swim w-[25%] h-[25%] ' style={{animationDuration: '20.0s'}} alt='' />
  </div>
}