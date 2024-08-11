import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { LuDownloadCloud } from "react-icons/lu";
import * as XLSX from 'xlsx';

const ExportData = (props) => {
    const { data } = props;

    const escapeAndQuoteValue = (value) => {
        if (typeof value === 'string') {
            value = value.trim();
            value = value.replace(/"/g, '""');
            return value.includes(',') ? `"${value}"` : value;
        }
        return value;
    };

    const handleDownloadClick = () => {
        const filteredData = data.filter(row => row.some(cell => cell.value !== undefined));
        if (!filteredData.length) {
            return [];
        }
        const transposedData = filteredData[0].map((_, colIndex) => filteredData.map(row => row[colIndex]));
        const filteredColumns = transposedData.filter(column => column.some(cell => cell.value !== undefined));
        const transposedBack = filteredColumns[0].map((_, rowIndex) => filteredColumns.map(column => column[rowIndex]));
        const csvContent = transposedBack.map(row => 
            row.map(cell => escapeAndQuoteValue(cell.value || ''))
            .join(',')
        ).join('\n');
        return csvContent;
    };

    const handleDownloadTSV = () => {
        const filteredData = data.filter(row => row.some(cell => cell.value !== undefined));
        if (!filteredData.length) {
            return [];
        }
        const transposedData = filteredData[0].map((_, colIndex) => filteredData.map(row => row[colIndex]));
        const filteredColumns = transposedData.filter(column => column.some(cell => cell.value !== undefined));
        const transposedBack = filteredColumns[0].map((_, rowIndex) => filteredColumns.map(column => column[rowIndex]));
        const tsvContent = transposedBack.map(row => 
            row.map(cell => (cell.value || '').trim().replace(/\t/g, ' '))
            .join('\t')
        ).join('\n');
        return tsvContent;
    };

    const downloadCSV = () => {
        const csvContent = handleDownloadClick();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'my-data.csv');
        link.click();
    };

    const downloadTSV = () => {
        const tsvContent = handleDownloadTSV();
        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'my-data.tsv');
        link.click();
    };

    const downloadXLSX = () => {
        const filteredData = data.filter(row => row.some(cell => cell.value !== undefined));
        if (!filteredData.length) {
            return [];
        }
        const transposedData = filteredData[0].map((_, colIndex) => filteredData.map(row => row[colIndex]));
        const filteredColumns = transposedData.filter(column => column.some(cell => cell.value !== undefined));
        const transposedBack = filteredColumns[0].map((_, rowIndex) => filteredColumns.map(column => column[rowIndex]));
        const sheetData = transposedBack.map(row => row.map(cell => cell.value || ''));
        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'my-data.xlsx');
    };

    return (
      <MenubarMenu>
          <MenubarTrigger>Export <LuDownloadCloud className='ml-3 text-lg'/></MenubarTrigger>
          <MenubarContent>
              <MenubarItem onClick={downloadCSV}>as CSV</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={downloadTSV}>as TSV</MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={downloadXLSX}>as XLSX</MenubarItem>
          </MenubarContent>
      </MenubarMenu>
    );
};

export default ExportData;