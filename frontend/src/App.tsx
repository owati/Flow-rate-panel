import React from 'react';
import { io } from 'socket.io-client';

interface FlowRateData {
  input: number,
  output: number,
  capacity: number
}
function App() {
  const [{
    capacity,
    input,
    output
  }, setFlowRate] = React.useState<FlowRateData>({
    input: 0,
    output: 0,
    capacity: 0
  });

  React.useEffect(
    () => {
      const socket = io('/')

      socket.on("connect", () => {
        console.log("Connected to server")
      })

      socket.on("data", (data: any) => {
        setFlowRate(data)
      })

      return function cleanup() {
        socket.disconnect()
      }
    }, []
  )
  return <div className='bg-slate-700 w-full h-screen'>

    {/*  Navbar */}
    <nav className='shadow-xl'>
      <div className='container mx-auto px-2 py-4'>
        <h1 className='text-white text-2xl'>Flow rate sensor panel</h1>
      </div>
    </nav>


    {/* Tank display */}
    <div className='h-[calc(100vh-64px)] container mx-auto px-2 py-4 flex md:scale-100 scale-75'>

      <div className='border-x-2 border-b w-full max-w-72 h-96 m-auto relative flex items-end'>

        <div className={`border-y-2 w-20 absolute -left-20 h-8 ${input ? "bg-white/50" : "bg-slate-700"} top-10`}>
          <p className='absolute text-sm -top-7 w-full text-center text-white'>{input.toFixed(2)}L/min</p>
        </div>

        <div className={`border-y-2 w-20 absolute -right-20 h-8 ${output ? "bg-white/50" : "bg-slate-700"} bottom-10`}>
          <p className='absolute text-sm -top-7 w-full text-center text-white'>{output.toFixed(2)}L/min</p>
        </div>

        {/* Quantity */}
        <div className='bg-white/50 w-full relative transition-all duration-700' style={{
          height : `${(capacity / 25) * 100}%`
        }}>
          <p className='absolute -top-9 text-2xl w-full text-center text-white'>{capacity.toFixed(2)} Litres</p>
        </div>
      </div>
    </div>
  </div>
}

export default App;
