import { useEffect, useState, useMemo } from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    }, 5000)
  }, [])

  // Problem
  // const cryptoReturns = exchange1Data.returns + exchange2Data.returns;
  // const incomeTax = (cryptoReturns + bankData.income) * 0.3

  // Solution 
  const allReturns = useMemo(() => {
    return exchange1Data.returns + exchange2Data.returns;
  }, [exchange1Data, exchange2Data]);

  const incomeTax = (allReturns + bankData.income) * 0.3;

  return (
    <div>
        <p>hi there, your income tax returns are {incomeTax}</p>
        <p>and your crypto returns are {allReturns}</p>
    </div>
  )
}

export default App