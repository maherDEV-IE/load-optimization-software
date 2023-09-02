"use client"
import {
  Grid, Card, Title, Text,
  Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, TableFoot, TableFooterCell
} from '@tremor/react';
import { useState, useEffect } from 'react';
import Truck3DLoading from "@/components/Truck3DLoading"

export default function IndexPage() {
  const [solution, setSolution] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/loading/');
        const result = await response.json();
        setSolution(result.solution);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  },[]);

  const truck = solution[0]
  return(
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Loading</Title>
        <Text>Displays Loading solutions.</Text>
        <Card className='mt-6'>
          <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-2">
              <Card>
              <Title>Truck and Cargo</Title>
              <Table className="mt-5">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Truck Id</TableHeaderCell>
                    <TableHeaderCell>Cargo Id</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    truck && truck.items.map((cargo) => (
                      <TableRow key={cargo.cargo_id}>
                        <TableCell>{truck.truck.id}</TableCell>
                        <TableCell>{cargo.cargo_id}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFoot>
                  <TableRow>
                    <TableFooterCell>Truck Id</TableFooterCell>
                    <TableFooterCell>Cargo Id</TableFooterCell>
                  </TableRow>
                </TableFoot>
              </Table>
              </Card>
              <Card>
              <Title>3D solution</Title>
              { truck && 
                <Truck3DLoading truck={truck}/>
              }
              </Card>
          </Grid>
        </Card>
    </main>
  );
}