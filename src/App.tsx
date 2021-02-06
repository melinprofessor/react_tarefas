import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Tarefa } from './entidade/Tarefa';
import { getTarefas } from './http';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LoadingComponent from './components/LoadingComponente';
import FormComponent from './components/FormComponent';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function App() {
  const classes = useStyles();

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
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Código</StyledTableCell>
                <StyledTableCell align="right">Título</StyledTableCell>
                <StyledTableCell align="right">Descrição</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.titulo}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.descricao}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default App;
