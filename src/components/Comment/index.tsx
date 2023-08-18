import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ComentarioProps {
  name: string;
  annotation: string;
  onEditar: (novoTexto: string) => void;
  onExcluir: () => void;
}

export default function CommentsCard({ name, annotation, onEditar, onExcluir }: ComentarioProps): JSX.Element{
  const [modoEdicao, setModoEdicao] = useState(false);
  const [novoTexto, setNovoTexto] = useState(annotation);

  const handleEditar = () => {
    setModoEdicao(true);
    setNovoTexto(annotation);
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
  };

  const handleSalvarEdicao = () => {
    onEditar(novoTexto);
    setModoEdicao(false);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        {modoEdicao ? (
          <TextField
            multiline
            fullWidth
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
          />
        ) : (
          <Typography>{annotation}</Typography>
        )}
        <div style={{ marginTop: '10px' }}>
          {modoEdicao ? (
            <>
              <IconButton onClick={handleSalvarEdicao} size="small">
                Salvar
              </IconButton>
              <IconButton onClick={handleCancelarEdicao} size="small">
                Cancelar
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={handleEditar} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={onExcluir} size="small">
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};


