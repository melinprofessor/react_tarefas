import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputError from './InputError';
import LoadingComponent from './LoadingComponente';
import { addTarefa } from '../http';
import { Tarefa } from '../entidade/Tarefa';

const valorInicialTarefa: Tarefa = {
  id: 0,
  titulo: '',
  descricao: '',
  status: 'pendente',
}

const FormComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const schemaValidacao = yup.object().shape({
    titulo: yup.string().required('O campo título é obrigatório!'),
    descricao: yup.string().required('O campo descrição é obrigatório!'),
    status: yup.string().required('O campo status é obrigatório!'),
  });

  const formik = useFormik({
    isInitialValid: false,
    validateOnChange: true,
    initialValues: valorInicialTarefa,
    validationSchema: schemaValidacao,
    onSubmit: (tarefa) => {
      setIsLoading(true);
      addTarefa(tarefa).then((result) =>{
        setIsLoading(false);
        console.log(result)
        window.location.reload(); 
      })
    },
  });

  if(isLoading) {
    return <LoadingComponent />
  }
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            disabled
            id="id"
            {...formik.getFieldProps('id')}
            label="Código"
          />
        </Grid>
        <Grid container spacing={3} item xs={12} md={12} lg={12}>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl fullWidth error={!!formik.errors.titulo}>
              <TextField
                id="titulo"
                label="Título"
                error={!!formik.errors.titulo}
                {...formik.getFieldProps('titulo')}
                fullWidth
                placeholder="Digite um título..."
              />
            <InputError mensagem={formik.errors.titulo} id="titulo" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl fullWidth error={!!formik.errors.descricao}>
              <TextField
                id="descricao"
                fullWidth
                error={!!formik.errors.descricao}
                label="Descrição"
                {...formik.getFieldProps('descricao')}
                placeholder="Digite uma descrição..."
              />
              <InputError mensagem={formik.errors.descricao} id="descricao" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={12}>
          <Grid item xs={4} md={4} lg={4}>
            <FormControl fullWidth error={!!formik.errors.status}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                {...formik.getFieldProps('status')}
                labelId="status"
                id="status"
                error={!!formik.errors.status}
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="finalizado">Finalizado</MenuItem>
              </Select>
              <InputError mensagem={formik.errors.status} id="status" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Button
            disabled={!formik.isValid}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComponent;
