import { ChangeEvent, useState } from "react"

type Props = {
    max?: number
    min?: number
    allowNegative?: boolean
    onChange: (value:number) => void
}

export function DurationField( {max, min, allowNegative=false, onChange} : Props) {
    const [duration, setDuration] = useState<number>(0);

    function handleDurationChange(event : ChangeEvent<HTMLInputElement>) {
        let value = Number(event.target.value);
        if(!isNaN(value)) {
            if(min !== undefined && value < min) value=min
            if(max !== undefined && value > max) value=max;
            if(!allowNegative && value < 0) value=0
            setDuration(value);
            onChange(value);
        }
    }  

    return (
        <>
        <h1>Duração da ligação (em minutos):</h1>
            <input value={duration} onChange={handleDurationChange}/>
        </>
    )

}