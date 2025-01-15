import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface FactCard {
  fact: string;
  length: number;
}

interface FetchFactsResponse {
  current_page: number;
  data: FactCard[];
  next_page_url: string | null;
}

const fetchFacts = async ({ pageParam = 1 }): Promise<FetchFactsResponse> => {
  try {
    const response = await axios.get(`https://catfact.ninja/facts?page=${pageParam}`);
    console.log("Response(fetchFacts):", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cat facts:", error);
    throw error;
  }
};

const useFetchFacts = () => {
  return useInfiniteQuery<FetchFactsResponse>({
    queryKey: ["facts"],
    queryFn: fetchFacts,
    getNextPageParam: (lastPage) => {
      return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
    },
  });
};

export default useFetchFacts;