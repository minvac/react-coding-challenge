"use client";
import { NextPage } from 'next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CardList from '@/components/CardList';

const queryClient = new QueryClient();

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CardList />
    </QueryClientProvider>
  );
};

export default Home;