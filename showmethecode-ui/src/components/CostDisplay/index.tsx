import { Plan, Tariff } from "../../interfaces"

type Props = {
    plan: Plan,
    tariff: Tariff,
    duration: number,
    defaultCost: number,
    planCost: number
}

export function CostDisplay( {plan, tariff, duration, defaultCost, planCost} : Props ) {

    const formatPrice = (price:number) => new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: "USD"
    }).format(price)

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
                    <td>{formatPrice(defaultCost)}</td>
                    <td>{formatPrice(planCost)}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}