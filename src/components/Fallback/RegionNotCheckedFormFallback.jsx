

export default function RegionNotCheckedFormFallback(){

  return <div className='bg-orange-100 w-[100%] h-[100%] md:w-[500px] md:flex md:flex-col md:relative'>
    <div className='bg-orange-200 w-[100%] h-[15%] md:w-[500px] md:h-[50px] text-stone-400 text-2xl md:text-[2rem] flex justify-start items-center'><p>지역을 선택하세요</p></div>
    <div className='md:h-[450px] bg-orange-100'></div>
  </div>
}