import React, { useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';

interface UserRegistrationModalProps {
  // Aqui você pode adicionar mais propriedades conforme necessário
}

const UserRegistrationModal: React.FC<UserRegistrationModalProps> = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserRegistration = () => {
    // Simulação de lógica de cadastro de usuário
    // Aqui você pode fazer a chamada para a API ou o que for necessário
    // E então, após o cadastro ser concluído com sucesso, abrir o modal
    handleOpen();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleUserRegistration}>
        Cadastrar Usuário
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" gutterBottom>
            Usuário Cadastrado
          </Typography>
          <Typography variant="body1">
            O usuário foi cadastrado com sucesso!
          </Typography>
          <Button onClick={handleClose} variant="contained" color="primary" style={{ marginTop: 16 }}>
            Fechar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserRegistrationModal;
