

import { useEffect, useState } from 'react';

import type {  NewDairyEntry, NonSensitiveDiaryEntry } from './types';
import dairyServices from './services/diaries';
import { NewDairyForm } from './components/NewDairyForm';
import axios from 'axios';

function App() {
  const [dairies, setDairies] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] =useState('');

  useEffect(()=> {
    dairyServices.getAll().then(result => setDairies(result));
  },[]);

  async function createNewEntry(entry:NewDairyEntry){
    try {
      const res = await dairyServices.createEntry(entry);
      setDairies(dairies.concat(res));
    } catch (e:unknown) {
      if(axios.isAxiosError(e)){
        setError(e.response.data.error[0].message);
        console.log(e.status);
        console.log(e.response);
        console.log(e.response.data.error[0].message);
        setTimeout(()=> {setError('');},10000);
      }
    }
  }

  return (
    <>
      {error && <div style={{color: "red"}}>{error}</div>}
      <NewDairyForm createNewDairy={createNewEntry}/>
      {dairies.map(item => <div key={item.id}><h3>{item.date}</h3>{item.visibility} {item.weather}</div>)}
      
    </>
  );
}

export default App;
