'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';

interface Filter {
  header: string;
  searchTerm: string;
}

const CsvReader: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filter[]>([{ header: '', searchTerm: '' }]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: Papa.ParseResult<any>) => {
          setData(results.data);
        },
      });
    }
  };

  const handleFilterChange = (index: number, key: keyof Filter, value: string) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { header: '', searchTerm: '' }]);
  };

  const filteredData = data.filter((row) =>
    filters.every((filter) =>
      filter.header
        ? (row[filter.header] as string).toString().toLowerCase().includes(filter.searchTerm.toLowerCase())
        : Object.values(row).some((value) =>
            (value as string).toString().toLowerCase().includes(filter.searchTerm.toLowerCase())
          )
    )
  );

  const exportFilteredData = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'filtered_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-dark1 min-h-screen text-dark8 container">
      <div className="title">CSV Analyzer</div> {/* Title at the top */}
      
      <div className="mb-6 relative">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="file-input"
        />
        <button
          onClick={() => (document.querySelector('.file-input') as HTMLInputElement)?.click()}
          className="custom-file-btn"
        >
          Upload File
        </button>
      </div>

      {filters.map((filter, index) => (
        <div key={index} className="mb-4 flex space-x-2 filter-container">
          <select
            value={filter.header}
            onChange={(e) => handleFilterChange(index, 'header', e.target.value)}
            className="block w-1/3 p-2 text-sm text-dark8 border border-dark4 rounded-lg bg-dark3 focus:outline-none"
          >
            <option value="">All Headers</option>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={filter.searchTerm}
            onChange={(e) => handleFilterChange(index, 'searchTerm', e.target.value)}
            className="block w-2/3 p-2 text-sm text-dark8 border border-dark4 rounded-lg bg-dark3 focus:outline-none"
          />
        </div>
      ))}

      <div className="flex space-x-4 mb-6 button-container">
        <button
          onClick={addFilter}
          className="p-2 bg-dark5 text-dark8 rounded-full hover:bg-dark6 transition"
        >
          Add Filter
        </button>
        <button
          onClick={exportFilteredData}
          className="p-2 bg-dark5 text-dark8 rounded-full hover:bg-dark6 transition"
        >
          Export Filtered Data
        </button>
      </div>

      {/* Scrollable table container */}
      <div className="overflow-x-auto mb-4">
        <table className="bg-dark2 border border-dark4 rounded-lg min-w-full">
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 border-b border-dark4 bg-dark4">
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className="hover:bg-dark5 transition">
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-4 py-2 border-b border-dark4">
                    {value as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvReader;
