import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CardsProps {
  title: string;
  content: string;
  onEditar: (novoTexto: string) => void;
  onExcluir: () => void;
}

export default function Cards({ title, content, onEditar, onExcluir }: CardsProps): JSX.Element{
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleEditar = () => {
    setModoEdicao(true);
    setNovoTexto(content);
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
  };

  const handleSalvarEdicao = () => {
    onEditar(novoTexto);
    setModoEdicao(false);
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '10px', width: '300px' }}>
      <CardContent>
        {modoEdicao ? (
          <>
          <TextField
          multiline
          fullWidth
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
          <TextField
            multiline
            fullWidth
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          </>

        ) : (
          <>
           <Typography variant="h6">{title}</Typography>
            <Typography>{novoTexto}</Typography>
          </>

        )}
        <div style={{ marginTop: '10px', display:'flex', justifyContent: 'flex-end' }}>
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
}


