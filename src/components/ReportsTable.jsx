import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as api from '../services/api'
import AppTextField from './AppTextField'
import daysjs from 'dayjs'

const cellStyle = {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    fontWeight: 'bold',
    padding:'7px !important',
}

const tCellStyle = {
    fontSize:"14px",
    fontWeight:"bold",
}
export default function ReportsTable({ data, updateField }) {
    return (
        <div style={{ minHeight: { sm: '100%', md: '500' }, width: '100%' }}>
            <TableContainer sx={{backgroundColor:'transparent'}} component={Paper}>
                <Table sx={{ minWidth: {xs:'100%', sm:'100%', md:'650'} }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellStyle} align="center">DATA</TableCell>
                            {/* <TableCell sx={cellStyle} align="center">VALOR INICIAL</TableCell> */}
                            <TableCell sx={cellStyle} align="center">STOP GAIN</TableCell>
                            <TableCell sx={cellStyle} align="center">STOP LOSS</TableCell>
                            <TableCell sx={cellStyle} align="center">LUCRO</TableCell>
                            <TableCell sx={cellStyle} align="center">%</TableCell>
                            <TableCell sx={cellStyle} align="center">VALOR FINAL</TableCell>
                            <TableCell sx={{ ...cellStyle, background:'#1db4a2', borderLeft:'1px solid #69647b', padding:'0px'}} align="center">WIN</TableCell>
                            <TableCell sx={{ ...cellStyle, background:'#da4e63', borderLeft:'1px solid #69647b', padding:'0px'}} align="center">LOSS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={item.id*1000}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, 'background':(index % 2) ? '#413a54':'transparent' }}
                            >
                                <TableCell sx={tCellStyle} align="center">{item?.date}</TableCell>
                                {/* <TableCell align="center">{item?.balance}</TableCell> */}
                                <TableCell sx={tCellStyle} align="center">{(item?.stopGain) ? new Intl.NumberFormat('pt-BR', {style: 'currency', currencyDisplay:'code', currency: 'USD' }).format(item?.stopGain?.toFixed(2)).replace('USD', '$'):'$ 0,00'}</TableCell>
                                <TableCell sx={tCellStyle} align="center">{(item?.stopLoss) ? new Intl.NumberFormat('pt-BR', {style: 'currency', currencyDisplay:'code', currency: 'USD' }).format(item?.stopLoss?.toFixed(2)).replace('USD', '$'):'$ 0,00'}</TableCell>
                                <TableCell sx={tCellStyle} align="center">
                                    {(item?.date == daysjs().format('DD/MM/YYYY')) ? 
                                    <AppTextField
                                        name="profit"
                                        sx={{
                                            width: '70px',
                                            "& input::placeholder": {
                                                fontSize: 12
                                            },
                                            input:{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                color:(item?.profit > 0) ? '#4a8d8e':'#995e73'
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <span style={{ color: 'white', paddingRight: '10px', fontSize:12, fontWeight:'bold' }}>$</span>
                                            ),
                                        }}
                                        placeholder="0.00"
                                        type="number"
                                        value={item?.profit}
                                        onChange={(e) => {
                                            updateField(item, e)
                                            api.saveManagement({
                                                profit: Number(e.target.value)
                                            })
                                        }}
                                    />:new Intl.NumberFormat('pt-BR', {style: 'currency', currencyDisplay:'code', currency: 'USD' }).format(item?.profit?.toFixed(2)).replace('USD', '$')}
                                </TableCell>
                                <TableCell sx={{...tCellStyle, color:(item?.profit && item?.balance) ? ((item?.profit / item?.balance * 100) > 0) ? (item?.profit > 0) ? '#4a8d8e':'#995e73':'#995e73':'white'}}  align="center">{(item?.profit && item?.balance) ? ((item?.profit / item?.balance) * 100).toFixed(2): 0}%</TableCell>
                                <TableCell sx={tCellStyle} align="center">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currencyDisplay:'code', currency: 'USD' }).format((Number(item?.balance) + Number(item?.profit)).toFixed(2)).replace('USD', '$')}
                                </TableCell>
                                <TableCell align="center" sx={{ ...tCellStyle, width:'10%', borderLeft: '1px solid #69647b !important' }}>
                                    {(item?.date == daysjs().format('DD/MM/YYYY')) ? <AppTextField
                                        name="win"
                                        sx={{
                                            width: '100%',
                                            "& input::placeholder": {
                                                fontSize: 14
                                            },
                                            input: {
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }
                                        }}
                                        placeholder="0.00"
                                        type="number"
                                        value={item?.win}
                                        onChange={(e) => {
                                            updateField(item, e)
                                            api.saveManagement({
                                                win: Number(e.target.value)
                                            })
                                        }}
                                    />:item?.win}
                                </TableCell>
                                <TableCell sx={{ ...tCellStyle, width: '10%', borderLeft: '1px solid #69647b !important', paddingRight:'14px !important' }} align="center">
                                    {(item?.date == daysjs().format('DD/MM/YYYY')) ? 
                                    <AppTextField
                                        name="loss"
                                        sx={{
                                            width: '100%',
                                            "& input::placeholder": {
                                                fontSize: 14
                                            },
                                            input:{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                            }
                                        }}
                                        placeholder="0.00"
                                        type="number"
                                        value={item?.loss}
                                        onChange={(e) => {
                                            updateField(item, e)
                                            api.saveManagement({
                                                loss: Number(e.target.value)
                                            })
                                        }}
                                    />:item?.loss}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}