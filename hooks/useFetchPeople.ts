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

const fetchPerson = async (): Promise<PeopleCard[]> => {
  const response = await axios.get(`https://randomuser.me/api?results=1`);
  return response.data.results.map((person: any) => ({
    name: {
      first: person.name.first,
      last: person.name.last,
    },
    picture: {
      thumbnail: person.picture.thumbnail,
    },
  }));
};

const useFetchPeople = () => {
  return useQuery<PeopleCard[], Error>({
    queryKey: ["person"],
    queryFn: fetchPerson,
  });
};

export default useFetchPeople;