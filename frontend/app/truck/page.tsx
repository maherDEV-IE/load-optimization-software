"use client";
import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Title,
  Text
} from "@tremor/react";
import { useState, useEffect } from 'react';

export type truck = {
    id: number,
    length: number,
    width: number,
    height: number,
    weight: number
}

export default function IndexPage() {
  const [truck, setTruck] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/truck/');
        const truck = await response.json();
        setTruck(truck);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Truck</Title>
      <Text>Displays a list of Trucks.</Text>
      <Card className="mt-6">
        {/* <div>
          <Flex className="space-x-0.5" justifyContent="end" alignItems="center">
            <Link href={"/truck/create"}><Button icon={PlusCircleIcon} tooltip="Add truck">Add truck</Button></Link>
          </Flex>
        </div> */}
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Truck type</TableHeaderCell>
              <TableHeaderCell className="text-right">Length (m)</TableHeaderCell>
              <TableHeaderCell className="text-right">Width (m)</TableHeaderCell>
              <TableHeaderCell className="text-right">Height (m)</TableHeaderCell>
              <TableHeaderCell className="text-right">Max weight (Kg)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {truck.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.truck_type}</TableCell>
                  <TableCell className="text-right">{item.length}</TableCell>
                  <TableCell className="text-right">{item.width}</TableCell>
                  <TableCell className="text-right">{item.height}</TableCell>
                  <TableCell className="text-right">{item.max_weight}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
}