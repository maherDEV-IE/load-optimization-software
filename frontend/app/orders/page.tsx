import { Title, Text } from '@tremor/react';

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Orders</Title>
      <Text>Displays a list of orders.</Text>
    </main>
  );
}