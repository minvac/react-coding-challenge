import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PeopleCard {
  name: {
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
}

const fetchPerson = async (index: number): Promise<PeopleCard> => {
  const response = await axios.get(`https://randomuser.me/api?results=1`);
  const person = response.data.results[0];
  return {
    name: {
      first: person.name.first,
      last: person.name.last,
    },
    picture: {
      thumbnail: person.picture.thumbnail,
    },
  };
};

const useFetchPerson = (index: number) => {
  return useQuery<PeopleCard, Error>({
    queryKey: ["person", index],
    queryFn: () => fetchPerson(index),
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useFetchPerson;
