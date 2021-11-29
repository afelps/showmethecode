import { useEffect, useState } from 'react';
import Select from 'react-select'
import { Tariff } from '../../interfaces'
import { getTariffs } from '../../services/api';

type Props = {
    onOriginSelected: (origin: string | undefined) => void,
    onDestinySelected: (destiny: string | undefined) => void
}

export function TariffSelector( { onOriginSelected, onDestinySelected } : Props ) {

    const [tariffs, setTarrifs] = useState<Tariff[]>([]);

    const [origin, setOrigin] = useState<string>();
    const [destiny, setDestiny] = useState<string>();

    useEffect(() => {
        getTariffs().then((response) => {
          setTarrifs(response.data.tarifas)
        });
    },[])

    function handleOriginChange(value: string | undefined) {
        setOrigin(value)
        onOriginSelected(value);
        handleDestinyChange(undefined);
    }

    function handleDestinyChange(value: string | undefined) {
        setDestiny(value);
        onDestinySelected(value);
    }


    const unique = (v:string,i:number,s:string[]) => s.indexOf(v) === i;
    const toOptions = (v:string) => {return {value: v, label: v}}

    const origins = tariffs.map(t=>t.origem).filter(unique).sort().map(toOptions);
    const destinies = tariffs.filter(t=>t.origem === origin).map(t=>t.destino).filter(unique).sort().map(toOptions);

    if(!tariffs) return <>Carregando Tarifas...</>
    return (<>
        <h1>Escolha a Origem: </h1>
        <Select options={origins} onChange={(v) => handleOriginChange(v!.value)} value={{value:origin, label:origin}}/>
        <h1>Escolha o Destino: </h1>
        <Select options={destinies} onChange={(v) => handleDestinyChange(v!.value)} value={{value:destiny, label:destiny}} />
    </>)
}
