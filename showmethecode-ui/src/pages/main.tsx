import { TariffSelector } from '../components/TarrifSelector'
import { PlanSelector } from "../components/PlanSelector";
import { FormEvent, useState } from 'react';
import { DurationField } from '../components/DurationField';
import { CallResponse } from '../interfaces';
import { calculateCall } from '../services/api';
import { CostDisplay } from '../components/CostDisplay';



export function MainPage() {

  const [origin, setOrigin] = useState<string>();
  const [destiny, setDestiny] = useState<string>();
  const [plan, setPlan] = useState<string>();
  const [duration, setDuration] = useState<number>(0);
  const [result, setResult] = useState<CallResponse>();

  function handleSubmit(event : FormEvent) {
    event.preventDefault();    
    calculateCall(origin!, destiny!, duration!, plan!).then(response => {
      setResult(response.data);
    }).catch((reason)=>{
      console.error(reason);
      alert('Ocorreu um erro, favor validar preenchimento de formulário e tentar novamente');
    })
  }

  const isFormOk = origin && destiny && plan && duration > 0;

  return (
    <>
      <header>
        <h1>Calculadora VxTel</h1>
      </header>
      <section>
        <form onSubmit={handleSubmit}>
          <TariffSelector onOriginSelected={setOrigin} onDestinySelected={setDestiny}/>
          <PlanSelector onSelected={setPlan}/>
          <DurationField max={1000} min={1} onChange={setDuration}/>
          <br/><br/>
          <input type="submit" value="Calcular" disabled={!isFormOk}/>
        </form>
      </section>
      <section>
        {result && <CostDisplay plan={result.plano} tariff={result.tarifa} duration={result.duracao} defaultCost={result.custoPadrao} planCost={result.custoComPlano}/>}
      </section>
    </>
  );
}
