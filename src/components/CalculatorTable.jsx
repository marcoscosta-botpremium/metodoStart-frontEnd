import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const cellStyle = {
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
}

export default function CalculatorTable({ simulation }) {
  return (
    <div style={{ minHeight: { sm: '100%', md: '500' }, width: '100%' }}>
      <TableContainer sx={{ backgroundColor: 'transparent' }} component={Paper}>
        <Table sx={{ minWidth: { xs: '100%', sm: '100%', md: '650' } }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle} align="center">ENTRADA</TableCell>
              <TableCell sx={cellStyle} align="center">VALOR DA ENTRADA</TableCell>
              <TableCell sx={cellStyle} align="center">GAIN</TableCell>
              <TableCell sx={cellStyle} align="center">LOSS</TableCell>
              <TableCell sx={cellStyle} align="center">LOSS ACUMULADO</TableCell>
              <TableCell sx={{ ...cellStyle, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} align="center">SALDO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {simulation.map((item, index) => (
              <TableRow
                key={item.contract_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: (index >= simulation.length - 5) ? `rgb(215,80,93, ${(index - (simulation.length - 5)) * 0.07})` : 'transparent' }}
              >
                <TableCell align="center">{item?.round}</TableCell>
                <TableCell align="center">${item?.entry.toFixed(2)}</TableCell>
                <TableCell sx={{ color: 'success.main' }} align="center">${item.gain.toFixed(2)}</TableCell>
                <TableCell sx={{ color: 'error.main' }} align="center">${item.loss.toFixed(2)}</TableCell>
                <TableCell sx={{ color: (item.totalLoss > 0) ? 'success.main' : 'error.main' }} align="center">${item.totalLoss}</TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' }, color: (item.balance > 0) ? 'success.main' : 'error.main' }} align="center">${item.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
