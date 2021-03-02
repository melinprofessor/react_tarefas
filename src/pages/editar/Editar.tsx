import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormComponent from '../../components/FormComponent';
import LoadingComponent from '../../components/LoadingComponente';
import { Tarefa } from '../../entidade/Tarefa';
import { get } from '../../http';

const Editar: React.FC = () => {
  const history = useHistory()
  const { id } = useParams<any>()
  console.log(id,'Este é o id da tarefa')
 
  const [tarefa, setTarefa] = useState<Tarefa | null>(null)

  useEffect(() => {
    (async()=>{
      if(!id) {
        history.push('/')
      } else {
        const resultado = await get(id);
        console.log(resultado)
        if(!resultado) {
          setTarefa(null);
        } else {
          setTarefa(resultado);
        }
      }
    })()
  }, [])

  if(!tarefa) {
    return <LoadingComponent />
  }
  return <Paper style={{padding:20}}>
      <FormComponent tarefa={tarefa} atualiza />
  </Paper>;
};

export default Editar;