import React, { createContext, useState } from 'react';

const SpreadsheetContext = createContext();

const SpreadsheetProvider = ({ children }) => {
    const [spreadSheetData, setSpreadSheetData] = useState(() => generateSpreadsheetGrid(30, 20));

    function generateSpreadsheetGrid(numRows, numColumns) {
        const data = [];
        for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numColumns; j++) {
                row.push({});
            }
            data.push(row);
        }
        return data;
    }

    return (
        <SpreadsheetContext.Provider value={{ spreadSheetData, setSpreadSheetData }}>
            {children}
        </SpreadsheetContext.Provider>
    );
};

export { SpreadsheetProvider, SpreadsheetContext };