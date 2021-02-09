import { FormHelperText } from '@material-ui/core';
import React from 'react';

interface Props {
  mensagem?: string;
  id: string;
  estilo?: React.CSSProperties
}
const InputError: React.FC<Props> = ({ mensagem, id }) => {
  if (mensagem) {
    return <FormHelperText id={`${id}-helper`}>{mensagem}</FormHelperText>;
  }
  return null;
};

export default InputError;
