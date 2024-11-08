import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function App() {
  const spacingTh = "px-4 py-2 text-center"

  const [data, setData] = useState([]);
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const symbols = "CAD,IDR,JPY,CHF,EUR,GBP"

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          apikey : apiKey,
          symbols: symbols
        }
      });
      setData(response.data); // Save response data in state
    } catch (err) {
      console.log(err.message); // Capture any error
    }
    // console.log(data)
  };

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className='flex flex-col justify-center items-center gap-5 h-[100dvh] bg-[#dc7001] text-white'>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className={spacingTh}>Currency</th>
            <th className={spacingTh}>We Buy</th>
            <th className={spacingTh}>Exchange Rate</th>
            <th className={spacingTh}>We Sell</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(data.rates).map(([currency, rate])  => {
          const numericRate = parseFloat(rate);
          const weBuyRate = numericRate * 1.05;
          const weSellRate = numericRate * 0.95;
          return(
          <tr key={currency}>
            <td className={spacingTh}>{currency}</td>
            <td className={spacingTh}>{weBuyRate.toFixed(4)}</td>
            <td className={spacingTh}>{rate}</td>
            <td className={spacingTh}>{weSellRate.toFixed(4)}</td>
          </tr>
          )
          })}
        </tbody>
      </table>
      <div className='flex flex-col items-center'>
        <h1>Rates are based from 1 {data.base}</h1>
        <p>this application uses API from <a href="https://currencyfreaks.com/">https://currencyfreaks.com/</a>/</p>
      </div>
    </div>
  )
}
