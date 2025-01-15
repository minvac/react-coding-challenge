import { FC, useEffect } from 'react';
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
import useFetchPeople from '@/hooks/useFetchPeople';

interface CharacterProps {
  description: string;
}

const PeopleCard: FC<CharacterProps> = ({ description }) => {

  const { data: people, isLoading, error, refetch } = useFetchPeople();

  useEffect(() => {
    refetch();

  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!people || people.length === 0) {
    return <div>No people found</div>;
  }

  const person = people[0];

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow text-left gap-2 min-w-[300px] min-h-[150px] mt-4 sm:min-w-[200px] sm:min-h-[100px] md:min-w-[250px] md:min-h-[120px] lg:min-w-[300px] lg:min-h-[150px]">
      <div className='flex items-center gap-2 mb-2'>
        <img src={person.picture.thumbnail} alt={`${person.name.first} ${person.name.last}`} />
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          {`${person.name.first} ${person.name.last}`}
        </h5>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default PeopleCard;