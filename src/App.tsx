import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
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
import LoadingComponent from './components/LoadingComponente'

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
    return <LoadingComponent />
  }

  return (
    <Grid>
      <Grid>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField disabled id="codigo" label="Código" />
            </Grid>
            <Grid container spacing={3} item xs={12} md={12} lg={12}>
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  id="titulo"
                  label="Título"
                  fullWidth
                  placeholder="Digite um título..."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <TextField
                  id="descricao"
                  fullWidth
                  label="Descrição"
                  placeholder="Digite uma descrição..."
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} md={12} lg={12}>
              <Grid item xs={4} md={4} lg={4}>
              <FormControl fullWidth>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem value="pendente">Pendente</MenuItem>
                    <MenuItem value="finalizado">Finalizado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button variant="contained" color="secondary">
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </form>
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
