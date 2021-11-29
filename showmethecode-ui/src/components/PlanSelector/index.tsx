import { useEffect, useState } from "react";
import { Plan } from "../../interfaces";
import { getPlans } from "../../services/api";
import Select from 'react-select'

type Props = {
    onSelected: (plan: string) => void;
}

export function PlanSelector( {onSelected} : Props ) {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selected, setSelected] = useState<string>();

    useEffect(() => {
        getPlans().then((response) => {
            setPlans(response.data.planos)
        });
    }, []);

    function handleChange(value: string) {
        setSelected(value);
        onSelected(value);
    }

    if(plans.length === 0) return <>Carregando Planos...</>

    const planOptions = plans.map(p=>{return {value: p.nome, label:p.nome}});

    return (
        <>
            <div>
            <h2>Selecione um Plano:</h2>
            <Select options={planOptions} onChange={(v) => handleChange(v?.value!)} value={{value:selected, label:selected}}/>
            </div>
        </>
    )
}