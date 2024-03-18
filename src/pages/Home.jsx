import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import logo from '../public/undraw_true_friends_c-94-g.svg';

export default function HomePage() {
  return (
    <div className="text-center p-0 h-[100vh]">
      <h1 className="md:text-6xl text-4xl text-blue-900 pt-7">Where To Meet</h1>
      <p className="md:text-4xl md:mt-14 text-2xl text-blue-700 mt-10 mb-14">
        어디서 만날지 고민될때
      </p>
      <img
        src={logo}
        alt=""
        className="md:w-[400px] md:h-[400px] w-[250px] h-[250px] object-cover m-auto"
      />
      <div className="pt-16">
        <motion.div whileHover={{ scale: 1.1 }} transition={{type: "spring", stiffness: 400 }}
        className='w-fit h-fit mx-auto'
        >
          <Link
            to="/places"
            className="md:w-[40px] md:h-[32px] w-[60px] h-[48px] py-4 px-6 text-2xl text-white bg-blue-500 cursor-pointer hover:brightness-95"
          >
            Find Place to Meet
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
