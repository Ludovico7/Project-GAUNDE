import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'

import { searchActions } from '../../store/redux/search-slice';


const REGIONS = ['수도권(서울, 경기, 인천)', '대전', '대구', '광주', '부산'];

export default function RegionCheckerLayout() {
  const dispatch = useDispatch();
  const regionName = useSelector((state) => state.search.region);
  const savedList = useSelector((state) => state.saved.savedList);

  function regionHandler(event) {
    dispatch(searchActions.setRegion(event.target.textContent));
  }

  return (
    <div className="w-[100%] my-0 md:flex md:flex-col md:justify-center md:items-center md:mb-6">
      <h3 className="m-0 mt-2 p-0 mb-2 text-xs text-gray-400 md:mt-4 md:text-sm">
        하나의 지역만 선택 가능합니다
      </h3>
      <ul className="w-[80%] mx-auto overflow-x-auto list-none flex gap-4 mb-4 p-0 md:w-[100%] md:mb-0 md:justify-center md:gap-4 md:overflow-hidden">
        {REGIONS.map((region, index) => (
          <li className='flex-none'>
            <motion.button
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            whileTap={{scale: [1, 0.95, 1]}}
            whileHover={{scale: [1, 1.05, 1]}}
            transition={{duration: 0.3}}
              key={index}
              className={
                regionName === region
                  ? 'border-none text-white bg-blue-500 px-6 py-3'
                  : 'border-none text-white bg-gray-400 px-6 py-3'
              }
              onClick={regionHandler}
              disabled={
                savedList.length > 0 && regionName && regionName !== region
              }
            >
              {region}
            </motion.button>
          </li>

        ))}
      </ul>

    </div>
  );
}
