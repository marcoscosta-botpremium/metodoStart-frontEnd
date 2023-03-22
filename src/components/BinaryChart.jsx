import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { Grid, CircularProgress, useTheme } from '@mui/material'
import { appid } from "../services/app"
import ApexCharts from "apexcharts"

export const BinaryChart = (props) => {
    const theme = useTheme()
    const { width, height } = props
    const [ticks, setTicks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${appid}`, {
        onOpen: () => {
            sendMessage('{"ticks_history":"R_100","adjust_start_time":1,"count":190,"end":"latest","start":1,"style":"ticks"}')
            sendMessage('{"ticks":"R_100"}')
        },
        shouldReconnect: () => true
    })
    useEffect(() => {
        if (lastMessage !== null) {
            let data = JSON.parse(lastMessage.data)
            if (data.msg_type == 'tick') {
                setTicks(dt => {
                    if (dt.length > 200) {
                        sendMessage('{"ticks_history":"R_100","adjust_start_time":1,"count":100,"end":"latest","start":1,"style":"ticks"}')
                    }
                    return [...dt, [data.tick.epoch * 1000, data.tick.quote.toFixed(2)]]
                })
                setIsLoading(false)
            }else{
                setTicks(data.history.times.map((epoch, index) => [data.history.times[index] * 1000, Number(data.history.prices[index].toFixed(2))]))
            }
        }
    }, [lastMessage])
    
    const chartOptions = {
        series: [{
            name:'Preço',
            data: ticks.slice()
        }],
        chart: {
            id:"realtime",
            background: "transparent",
            toolbar: {
                show: false,
            },
            stacked: false,
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                    speed: 500
                }
            },
        },
        colors: ['#228141', theme.palette.warning.main],
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        theme: {
            mode: theme.palette.mode,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.5,
                opacityFrom: 0.7,
                opacityTo: 0
            },
        },
        xaxis: {
            type:'datetime',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                fontWeight: 500,
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                },
            },
        },
        yaxis: {
            tickAmount: 3,
            max: Math.ceil(Math.max.apply(Math, ticks.map(value => value[1]))),
            min: Math.floor(Math.min.apply(Math,ticks.map(value => value[1]))),
            labels: {
                style: {
                    fontWeight: 500,
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                },
            },
        },
        tooltip: {
            style: {
                fontFamily: theme.typography.fontFamily,
                fontSize: "13px",
            },
            x: {
                show: false,
            },
            y: {
                formatter: (val) => `$${String(val).replace('.', ',')}`,
            },
            },
            legend: {
            position: "top",
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily,
            itemMargin: {
                horizontal: 15,
            },
        },
        stroke: {
            curve: "smooth",
        },
    }
    return isLoading ? (
        <CircularProgress sx={{ marginTop:21, alignSelf:'center', color: 'white', borderWidth: 0 }} />
    ):
    (
        <Chart
            options={chartOptions}
            series={chartOptions.series}
            type="area"
            width={width}
            height={height}
        />
    )
}