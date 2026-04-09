import { useState } from "react";
import { Visibility, Weather } from "../types";
import type { NewDairyEntry } from "../types";

interface NewDairyFormProps {
    createNewDairy:(entry: NewDairyEntry) => void;
}
export const NewDairyForm = ({createNewDairy}:NewDairyFormProps) => {
    const [comment,setComment] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [visibility, setVisibility] =useState<Visibility>(Visibility.Great);

    const createDairy = (e: React.SyntheticEvent) => {
        e.preventDefault();
        createNewDairy({comment,date,weather,visibility});
        setComment('');
        setDate('');
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Great);

    };


    return(
        <form onSubmit={createDairy}>
            <div>
                <label htmlFor="comment">Comment</label>
                <input id="comment" value={comment} onChange={(e)=> setComment(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input type="date" id="date" value={date} onChange={(e)=> setDate(e.target.value)}></input>
            </div>
            <div>Weather:
                {Object.values(Weather).map(item => (
                    <label key={item}>{item}
                        <input 
                            type="radio" 
                            radioGroup="weather"
                            value ={item}
                            checked ={weather === item}
                            onChange={(e)=> setWeather(e.target.value as Weather)}
                        />
                    </label>
                ))}

            </div>
            <div>
                <label htmlFor="visibility">Visibility</label>
                <select id="visibility" value={visibility} onChange={(e)=> setVisibility(e.target.value as Visibility)}>
                    {Object.values(Visibility).map(item => <option key ={item} value={item}>{item}</option>)}
                </select>
            </div>
            <button type="submit">create new</button>
        </form>
    );
};
/*<select id="weather" value={weather} onChange={(e)=> setWeather(e.target.value as Weather)}>
{Object.values(Weather).map(item => <option key ={item} value={item}>{item}</option>)}


                <label htmlFor="weather">Weather</label>
                <input id="weather" value={weather} onChange={(e)=> setWeather(e.target.value as Weather)}>
                    
                </input>*/