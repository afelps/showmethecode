import { Plan, Tariff } from "../../interfaces"

type Props = {
    plan: Plan,
    tariff: Tariff,
    duration: number,
    defaultCost: number,
    planCost: number
}

export function CostDisplay( {plan, tariff, duration, defaultCost, planCost} : Props ) {
    return (
        <>
        <table>
           <thead>
                <tr>
                    <th>Origem</th>
                    <th>Destino</th>
                    <th>Duração</th>
                    <th>Custo sem nenhum plano</th>
                    <th>Custo com plano {plan.nome}</th>
                </tr>
            </thead> 
            <tbody>
                <tr>
                    <td>{tariff.origem}</td>
                    <td>{tariff.destino}</td>
                    <td>{duration}</td>
                    <td>{defaultCost}</td>
                    <td>{planCost}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}