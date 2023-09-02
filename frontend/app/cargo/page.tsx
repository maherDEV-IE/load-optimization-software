"use client";
import Link from "next/link";
import {
  Button,
  Card,
  Icon,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Title,
  Text,
  Flex,
} from "@tremor/react";
import { PlusCircleIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';

export type Cargo = {
    id: number,
    length: number,
    width: number,
    height: number,
    weight: number
}

export default function IndexPage() {
  const [cargo, setCargo] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/cargo/');
        const cargo = await response.json();
        setCargo(cargo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Cargo</Title>
      <Text>Displays list of cargoes.</Text>
      <Card className="mt-6">
        <div>
        <Flex className="space-x-0.5" justifyContent="end" alignItems="center">
          <Link href={"/cargo/create"}><Button icon={PlusCircleIcon} tooltip="Add cargo item">Add cargo</Button></Link>
        </Flex>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell className="text-right">Length (m)</TableHeaderCell>
            <TableHeaderCell className="text-right">Width (m)</TableHeaderCell>
            <TableHeaderCell className="text-right">Height (m)</TableHeaderCell>
            <TableHeaderCell className="text-right">Weight (Kg)</TableHeaderCell>
            <TableHeaderCell className="text-right">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cargo.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="text-right">{item.length}</TableCell>
                <TableCell className="text-right">{item.width}</TableCell>
                <TableCell className="text-right">{item.height}</TableCell>
                <TableCell className="text-right">{item.weight}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/cargo/${item.id}/`}><Icon icon={EyeIcon} tooltip="View cargo item" /></Link> 
                  <Link href={`/cargo/${item.id}/`}><Icon icon={PencilSquareIcon} tooltip="Update cargo item" /></Link> 
                  <Link href={`/cargo/${item.id}/delete`}><Icon icon={TrashIcon} tooltip="Remove cargo item" /></Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      </Card>
    </main>
  );
}