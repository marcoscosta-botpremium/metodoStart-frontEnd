import { useState, createContext, useEffect } from "react"
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { appid } from "../services/app"

export const BinaryContext = createContext()

const BinaryProvider = ({ children }) => {
  const [profitTable, setTable] = useState([])
  const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://ws.binaryws.com/websockets/v3?app_id=${appid}`, {
    onOpen: () => {
      sendMessage(JSON.stringify({
        "authorize": localStorage.activeToken
      }))
    },
    shouldReconnect: () => true
  })

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data)

      if(data.msg_type == 'authorize'){
        sendMessage(JSON.stringify({
          "profit_table": 1,
          "description": 0,
          "offset": 0,
          "limit": 50
        }))
      }
      if (data.msg_type === "profit_table") {
        console.log(data)
        setTable(data.profit_table?.transactions)
      }
    }
  }, [lastMessage])

  return (
    <BinaryContext.Provider
      value={{
        profitTable,
        updateTable: () => {
          sendMessage(JSON.stringify({
            "authorize": localStorage.activeToken
          }))
          sendMessage(JSON.stringify({
            "profit_table": 1,
            "description": 0,
            "offset": 0,
            "limit": 50
          }))
        },
      }}
    >
      {children}
    </BinaryContext.Provider>
  )
}

export default BinaryProvider
