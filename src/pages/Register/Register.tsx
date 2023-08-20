
import * as S from './styled';
import logo from '../../assets/logo.png'
import { Typography } from '@mui/material';
import TextField from '../../components/TextField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FakerApi from '../../services/fakerApi.js';
import Modal from '../../components/Modal';


export default function Register() {
    const navigete = useNavigate();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await FakerApi.post('/register', { name, username, password });
            setName('');
            setUsername('');
            setPassword('');
            alert('Usuário cadastrado com sucesso!');
            navigete('/');


        }
        catch (error) {
            console.log(error);
        }
        console.log('Dados do formulário:', { name, username, password });
    };

    return (
        <S.Container>

            <form onSubmit={handleSubmit}>
                <S.Paper elevation={5} >
                    <img src={logo} alt="logo" />
                    <TextField
                        label={"Nome"}
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        label={"Usuário"}
                        value={username}
                        onChange={handleUsernameChange}
                        sx={{ marginTop: 2 }}
                    />
                    <TextField
                        label={"Senha"}
                        value={password}
                        onChange={handlePasswordChange}
                        sx={{ marginTop: 2 }}
                        type='password'
                    />
                    <S.Button type="submit" variant="contained" sx={{ marginTop: 3 }} >Cadastrar</S.Button>
                    <Typography sx={{ marginTop: 2, marginBottom: 3 }}><Link to="/">Voltar</Link></Typography>
                </S.Paper>
            </form>
            <Modal/>
        </S.Container>
    );
}