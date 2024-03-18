import fallbackImage from '../../public/undraw_navigation_re_wxx4.svg';

export default function MapFallback() {
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center bg-slate-200 ">
      <span className="flex flex-col justify-center items-center gap-8 w-[10%] h-[10%]">
        <img
          src={fallbackImage}
          className="ld ld-wander-h  opacity-40"
          style={{ animationDuration: '4.0s' }}
          alt=""
        />
        <h2 className='text-slate-300'>Loading...</h2>
      </span>
    </div>
  );
}
