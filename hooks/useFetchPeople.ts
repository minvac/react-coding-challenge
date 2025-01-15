import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PeopleCard {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
}

const fetchPerson = async (): Promise<PeopleCard> => {
  try {
    const response = await axios.get(`https://randomuser.me/api?results=1`);
    console.log(response);

    const person = response.data.results[0];
    return {
      name: person.name,
      picture: person.picture,
    };
  } catch (error) {
    console.error("Error fetching person:", error);
    throw error;
  }
};

const useFetchPerson = () => {
  return useQuery<PeopleCard, Error>({
    queryKey: ["person"],
    queryFn: fetchPerson,
  });
};

export default useFetchPerson;