import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BotContext } from '../contexts/BotContext';
import moment from 'moment';
const cellStyle = {
  color: 'white',
  fontSize: '14px',
  fontWeight: 'bold',
}

export default function TradeTable() {
  const { trades, setTrades } = React.useContext(BotContext)

  const treatCid = (cid) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const CID = (userInfo?.pre_contract) ? userInfo?.pre_contract + String(cid).substring(userInfo.pre_contract?.length) : cid
    const CID2 = (userInfo.pos_contract) ? CID.slice(0, -userInfo.pos_contract?.length) + userInfo?.pos_contract : CID
    return CID2
  }

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <div style={{ minHeight: { sm: '100%', md: '500' }, width: '100%' }}>
      <TableContainer sx={{ backgroundColor: 'transparent' }} component={Paper}>
        <Table sx={{ minWidth: { xs: '100%', sm: '100%', md: '650' } }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle} align="center">Data</TableCell>
              {/* <TableCell sx={cellStyle} align="center">ID</TableCell> */}
              <TableCell sx={cellStyle} align="center">Tipo</TableCell>
              <TableCell sx={{ ...cellStyle, display: { xs: 'none', sm: 'none', md: 'table-cell' } }} align="center">Entrada</TableCell>
              <TableCell sx={{ ...cellStyle, display: { xs: 'none', sm: 'none', md: 'table-cell' } }} align="center">Saída</TableCell>
              <TableCell sx={cellStyle} align="center">Investimento</TableCell>
              <TableCell sx={cellStyle} align="center">Resultado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((item, index) => (
              <TableRow
                key={item.contract_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'background': (index % 2) ? '#010101' : 'transparent' }}
              >
                <TableCell align="center">
                  {moment((isSafari) ? item.timestamp.slice(0, 10).replace(/-/g, "/") + item.timestamp.slice(10, item.timestamp.length) : item.timestamp).format('DD/MM/YYYY h:mm:ss')}
                </TableCell>
                {/* <TableCell align="center">{(localStorage.bootTrue == 'true') ? treatCid(item.contract_id):item.contract_id}</TableCell> */}
                <TableCell align="center">{item.contract_type}</TableCell>
                <TableCell sx={{ ...cellStyle, display: { xs: 'none', sm: 'none', md: 'table-cell' } }} align="center">{item.entry_spot}</TableCell>
                <TableCell sx={{ ...cellStyle, display: { xs: 'none', sm: 'none', md: 'table-cell' } }} align="center">{(item.profit) ? item.current_spot : null}</TableCell>
                <TableCell align="center">{item.buy_price}</TableCell>
                <TableCell style={{ color: (Number(item.profit) >= 0) ? '#1fa69a' : '#c2465b' }} align="center">{(item.profit) ? '$' + (Number(item.profit)).toFixed(2) : null}</TableCell>
                {/* <TableCell align="center">{item.profit}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
