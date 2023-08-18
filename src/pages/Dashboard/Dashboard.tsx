import React, { useState } from 'react';
import { Button, Container,  Typography } from '@mui/material';
import Comentario from '../../components/Comment';
import TextField from '../../components/TextField';

import Navbar from "../../components/NavBar"
import * as S from './styled';



export default function Dashboard() {

    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clearing user session, redirecting to login page, etc.
        console.log('Logged out');
    };
    const [comentarios, setComentarios] = useState<{ name: string; annotation: string }[]>([]);
    const [nomeNovoComentario, setNomeNovoComentario] = useState('');
    const [textoNovoComentario, setTextoNovoComentario] = useState('');

    const handleAdicionarComentario = () => {
        if (nomeNovoComentario && textoNovoComentario) {
            setComentarios([...comentarios, { name: nomeNovoComentario, annotation: textoNovoComentario }]);
            setNomeNovoComentario('');
            setTextoNovoComentario('');
        }
    };

    const handleEditarComentario = (indice: number, novoTexto: string) => {
        const novosComentarios = [...comentarios];
        novosComentarios[indice].annotation = novoTexto;
        setComentarios(novosComentarios);
    };

    const handleExcluirComentario = (indice: number) => {
        const novosComentarios = comentarios.filter((_, i) => i !== indice);
        setComentarios(novosComentarios);
    };


    return (
        <>
            <S.NavContainer>
                <Navbar onLogout={handleLogout} />
            </S.NavContainer>
            <S.Container>
                <S.BoxLeft style={{ marginBottom: '20px' }}>
                    <TextField
                        label="Nome"
                        value={nomeNovoComentario}
                        onChange={(e) => setNomeNovoComentario(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Comentário"
                        value={textoNovoComentario}
                        onChange={(e) => setTextoNovoComentario(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                        height="90px"
                    />
                    <Button variant="contained" onClick={handleAdicionarComentario}>
                        Adicionar Comentário
                    </Button>
                </S.BoxLeft>
                <S.BoxRight>
                    {comentarios.map((comentario, index) => (
                        <Comentario
                            key={index}
                            name={comentario.name}
                            annotation={comentario.annotation}
                            onEditar={(novoTexto) => handleEditarComentario(index, novoTexto)}
                            onExcluir={() => handleExcluirComentario(index)}
                        />
                    ))}
                </S.BoxRight>
            </S.Container>

        </>
    )
}