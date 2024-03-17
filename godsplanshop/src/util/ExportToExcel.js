import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style'; 

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);

    for (let col = 0; col <= 4; col++) {
      const cellRef = XLSXStyle.utils.encode_cell({ r: 0, c: col });
      ws[cellRef].s = { font: { bold: true } };
    }

    
    ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 30 }, { wch: 10 }];


    ws['!autofilter'] = { ref: 'A1:E1' };

    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSXStyle.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button onClick={(e) => exportToExcel(apiData, fileName)}>Exportar a Excel</button>
  );
};