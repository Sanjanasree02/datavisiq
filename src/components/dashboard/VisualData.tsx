"use client"; // Mark as a client component

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VisualData: React.FC = () => {
  const [inputValue, setInputValue] = useState("10,20,30,40,50");
  const [selectedStructure, setSelectedStructure] = useState("array");
  const [visualElements, setVisualElements] = useState<JSX.Element[]>([]);

  // Handles structure change and updates default input value
  const handleStructureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStructure(value);
    if (value === "array") setInputValue("10,20,30,40,50");
    else if (value === "linked") setInputValue("10->20->30->40->50");
  };

  // Function to handle "start" button click
  const startVisualization = () => {
    if (selectedStructure === "array") {
      createArrayVisualization();
    } else if (selectedStructure === "linked") {
      createLinkedListVisualization();
    }
  };

  // Function to create array visualization
  const createArrayVisualization = () => {
    const items = inputValue.split(",").map((item) => Number(item));
    const elements = items.map((item, index) => (
      <div
        key={index}
        className="w-24 h-24 bg-white border-2 border-black flex items-center justify-center text-lg font-bold mx-2"
      >
        {item}
      </div>
    ));
    setVisualElements(elements);
  };

  // Function to create linked list visualization
  const createLinkedListVisualization = () => {
    const items = inputValue.split("->").map((item) => Number(item));
    const elements = items
      .flatMap((item, index) => [
        <div
          key={index}
          className="w-24 h-24 bg-white border-2 border-black flex items-center justify-center text-lg font-bold mx-2"
        >
          {item}
        </div>,
        index < items.length - 1 && (
          <div key={`arrow-${index}`} className="text-lg font-bold mx-2">
            --&gt;
          </div>
        ),
      ])
      .filter(Boolean); // Filter out any false values
      setVisualElements(elements);
  };

  // Clears the visualization
  const clearVisualization = () => {
    setVisualElements([]);
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 p-4 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">Visualize Data Structures</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Input section */}
          <div className="mb-4">
            <label htmlFor="structure" className="text-lg font-medium mr-4">
              Select Structure:
            </label>
            <select
              id="structure"
              className="text-lg p-2 border border-gray-300 rounded-md mr-4"
              value={selectedStructure}
              onChange={handleStructureChange}
            >
              <option value="array">Array</option>
              <option value="linked">Linked List</option>
            </select>
            <input
              id="array"
              className="text-lg p-2 border border-gray-300 rounded-md"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {/* Action buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={startVisualization}
            >
              Start
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={clearVisualization}
            >
              Clear
            </button>
          </div>

          {/* Visual Representation */}
          <div className="flex flex-wrap justify-center space-x-4">
            {visualElements}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualData;
