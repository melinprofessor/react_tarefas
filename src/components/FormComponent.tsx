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
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const FormComponent: React.FC = () => {
  const schemaValidacao = yup.object().shape({
    titulo: yup.string().required('O campo título é obrigatório!'),
    descricao: yup.string().required('O campo descrição é obrigatório!'),
    status: yup.string().required('O campo status é obrigatório!'),
  });

  const formik = useFormik({
    isInitialValid: false,
    validateOnChange: true,
    initialValues: {
      codigo: 0,
      titulo: '',
      descricao: '',
      status: '',
    },
    validationSchema: schemaValidacao,
    onSubmit: ({ codigo, descricao, status, titulo }) => {
      console.log(codigo, descricao, status, titulo);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            disabled
            id="codigo"
            {...formik.getFieldProps('codigo')}
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
              {formik.errors?.titulo ? (
                <FormHelperText id="titulo-helper">
                  {formik.errors.titulo}
                </FormHelperText>
              ) : null}
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
              {formik.errors?.descricao ? (
                <FormHelperText id="descricao-helper">
                  {formik.errors.descricao}
                </FormHelperText>
              ) : null}
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
              {formik.errors?.status ? (
                <FormHelperText id="status-helper">
                  {formik.errors.status}
                </FormHelperText>
              ) : null}
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
