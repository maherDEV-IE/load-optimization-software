"use client"
import { 
  Button,
  Card, 
  Title, 
  Text,
  Select,
  SelectItem,
  NumberInput,
  Grid,
  Col
} from '@tremor/react';
import { CubeIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export type BoxData = {
    length: number;
    width: number;
    height: number;
    weight: number
}

export type Box = {
    id: string;
    length: number;
    width: number;
    height: number;
}

export const boxes: Box[] = [
    {id: '0', length: 1, width: 1, height: 1},
    {id: '1', length: 1, width: 1.2, height: 1},
    {id: '2', length: 1, width: 2, height: 1},
    {id: '3', length: 2, width: 2, height: 1}
]

function getCookie(name:string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default function IndexPage() {
  const [cargoType, setCargoType] = useState('0');
  const [length, setLength] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const csrftoken = getCookie('csrftoken');
    let boxeData: BoxData
    if (cargoType == 'custom'){
      boxeData = {
        "length": length,
        "width": width,
        "height": height,
        "weight": weight
      }
    } else{
      boxeData = {
        "length": boxes[cargoType].length,
        "width": boxes[cargoType].width,
        "height": boxes[cargoType].height,
        "weight": weight
      }
    }
    for (let i = 0; i < quantity; i++) {
      try {
        const response = await fetch('/api/cargo/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify(boxeData)
        });
        if (response.ok) {
          console.log(`Cargo ${i + 1} added successfully`);
        } else {
          console.log(response)
          console.error(`Error adding Cargo ${i + 1}`);
        }
      } catch (error) {
        console.error(`Error adding Cargo ${i + 1}:`, error);
      }
    }
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Cargo</Title>
      <Text>Add cargo.</Text>
      <Card className="mt-6">
        <div className="p-2">
            <label htmlFor="cargoType">Cargo Type</label>
            <Select id="cargoType" value={cargoType} onValueChange={setCargoType} icon={CubeIcon}>
                {boxes.map((item) => (
                  <SelectItem key={item.id} value={item.id} icon={CubeIcon}>
                    Box of {item.length}*{item.width}*{item.height}m
                  </SelectItem>
                ))}
                <SelectItem value="custom" icon={CubeIcon}>Custom Box</SelectItem>
            </Select>
          </div>
        <form onSubmit={submit}>
          <div className={`${cargoType === 'custom' ? '' : 'hidden'}`}>
            <Grid numItems={1} numItemsSm={3} numItemsLg={3} className="gap-2">
              <Col className="p-2">
                <label htmlFor="length">Length (m)</label>
                <NumberInput 
                  placeholder="Length (m)"
                  step="0.01"
                  id="length" 
                  name="length" 
                  value={length}
                  onValueChange={setLength}
                  min={0}
                />
              </Col>
              <Col className="p-2">
                <label htmlFor="width">Width (m)</label>
                <NumberInput 
                  placeholder="Width (m)"
                  step="0.01"
                  id="width"
                  name="width" 
                  value={width}
                  onValueChange={setWidth}
                  min={0}
                />
              </Col>
              <Col className="p-2">
                <label htmlFor="height">Height (m)</label>
                <NumberInput 
                  placeholder="Height (m)"
                  step="0.01"
                  id="height" 
                  name="height" 
                  value={height}
                  onValueChange={setHeight}
                  min={0}
                />
              </Col>
            </Grid>
          </div>
          <div className="p-2">
            <label htmlFor="weight">Weight (Kg)</label>
            <NumberInput placeholder="Height (m)" id="weight" name="weight" value={weight} onValueChange={setWeight} min={0}/>
          </div>
          <div className="p-2">
            <label htmlFor="quantity">Quantity</label>
            <NumberInput placeholder="Quantity" id="quantity" name="quantity" value={quantity} onValueChange={setQuantity} min={1}/>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </main>
  );
}