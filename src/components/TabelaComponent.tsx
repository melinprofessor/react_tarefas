import {
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { Tarefa } from '../entidade/Tarefa';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';




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

interface Props {
    lista: Tarefa[]
}
const TabelaComponent:React.FC<Props> = ({lista}) => {
  const classes = useStyles();
  const history = useHistory()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Código</StyledTableCell>
            <StyledTableCell align="right">Título</StyledTableCell>
            <StyledTableCell align="right">Descrição</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lista.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.titulo}</StyledTableCell>
              <StyledTableCell align="right">{row.descricao}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">
              <Tooltip title='Editar Tarefa'>
                <EditOutlinedIcon onClick={()=> history.push('/editar')} color='primary' />
                </Tooltip>
                <Tooltip title='Excluir Tarefa'>
                <DeleteOutlinedIcon color='secondary' />
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaComponent;
