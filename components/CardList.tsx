import { useEffect, useRef, useState } from "react";
import useFetchFacts from "@/hooks/useFetchFacts";
import useFetchPeople from "@/hooks/useFetchPeople";
import PeopleCard from "./PeopleCard";

type Fact = {
  fact: string;
};

type Page = {
  data: Fact[];
};

type DataFacts = {
  pages: Page[];
};

const CardList: React.FC = () => {


  const { data: dataFacts, isLoading: isLoadingFacts, error: errorFacts, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchFacts();

  useEffect(() => {
    if (errorFacts) {
      alert(`Error fetching cat facts: ${errorFacts.message}`);
    }
  }, [errorFacts]);

  if (isLoadingFacts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center bg-striped">
      <div className="w-full sm:w-4/5 md:w-3/5 bg-gray-100 p-4 m-2 rounded min-h-screen border-2">
        {dataFacts?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data.map((fact, factIndex) => (
              <PeopleCard key={factIndex} description={fact.fact} />
            ))}
          </div>
        ))}
        {hasNextPage && (
          <div className="flex justify-center">
            <button className={`bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded ${isFetchingNextPage ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "Loading more..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;