import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Tarefa } from './entidade/Tarefa';
import { getTarefas } from './http';
import Paper from '@material-ui/core/Paper';
import LoadingComponent from './components/LoadingComponente';
import FormComponent from './components/FormComponent';
import TabelaComponent from './components/TabelaComponent';


function App() {

  const [lista, setLista] = useState<Tarefa[] | null>(null);
  useEffect(() => {
    getTarefas().then((result) => setLista(result));
  }, []);

  if (lista === null) {
    return <LoadingComponent />;
  }

  return (
    <Grid>
      <Grid style={{ paddingTop: 20 }}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <FormComponent />
        </Paper>
      </Grid>
      <Grid style={{ paddingTop: 50 }}>
        <TabelaComponent lista={lista} />
      </Grid>
    </Grid>
  );
}

export default App;
