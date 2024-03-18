
export default function SearchFormFallback(){

  return <div className='bg-orange-100 md:w-[500px] flex flex-col items-center relative'>
    <div className='border-none bg-orange-200 w-[100%] h-[15%] md:w-[500px] md:h-[50px] text-stone-400 text-2xl md:text-[2rem] flex justify-start items-center cursor-pointer '><p>지도 로드중...</p></div>
    <div className='md:h-[450px] flex justify-center items-center bg-orange-100'>
    </div>
  </div>
}