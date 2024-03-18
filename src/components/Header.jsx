import { Link } from 'react-router-dom';

import left from '../public/326575_chevron_left_icon.png'

export default function Header({title, to}) {
  return (
    <header className=' h-12 border-b-[1px] border-b-slate-200 relative'>
      <nav className='flex items-center justify-center h-full'>
        <Link to={to} className='absolute left-4'>
          <img src={left} alt="" className='h-4 w-4'/>
        </Link>
        <h1>{title}</h1>
      </nav>
    </header>
  );
}
