import { useEffect, useState } from 'react'
import axios from 'axios';

import './App.css'

interface userType {
  id: number,
  firstName: string,
  lastName: string;
}

function App() {
  const [data, setData] = useState<userType[]>([])

  const handleDataFetch = async () => {
    const {data} = await axios('http://localhost:8080/users');
    setData(data);
  }

  useEffect(() => {
    handleDataFetch();
  },[])

  return (
   <ul>
    {data.map((user) => {
      return <li key={user.id}>{user.firstName}</li>
    })}
   </ul>
  )
}

export default App
