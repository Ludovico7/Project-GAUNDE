import { useSelector } from 'react-redux';

import ActivityListItem from './ActivityListItem';


export default function ActivityList({ name }) {
  const places = useSelector(state => state.search.places);

  return (
    <div className='w-[100%] h-[100%] bg-blue-300 md:h-[500px] overflow-x-hidden overflow-y-auto'>
      <ul className='flex flex-col list-none m-0 p-0 overflow-y-auto overflow-x-hidden h-[100%]'>
        {places.map((place) => (
          <ActivityListItem
            key={`place-${place.id}`}
            place={place}
            name={name}
          />
        ))}
      </ul>
    </div>
  );
}
