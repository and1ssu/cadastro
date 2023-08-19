
import * as S from './styled';
import logoG from '../../assets/desenho-destaque.jpg'
import logo from '../../assets/logo.png'
import { Typography } from '@mui/material';
import TextField from '../../components/TextField';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FakerApi from '../../services/fakerApi.js';



export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigete = useNavigate();
    console.log(message);
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await FakerApi.post('/login', { username, password });
            setUsername('');
            setPassword('');
            navigete('/Dashboard');
        } catch (error) {
            setMessage('Usuário ou senha incorretos');
            console.log(error);
        }

    };

    return (
        <S.Container>
            <S.BoxLeft>
                <S.Img src={logoG} alt="logo" />
            </S.BoxLeft>
            <S.BoxRight>
                <form onSubmit={handleSubmit}>
                    <S.Paper elevation={5} >
                        <img src={logo} alt="logo" />
                        <TextField
                            error={message !== ''}
                            label={"Usuário"}
                            value={username}
                            onChange={handleUsernameChange}
                            helperText={message}
                        />
                        <TextField
                            error={message !== ''}
                            label={"Senha"}
                            value={password}
                            onChange={handlePasswordChange}
                            sx={{ marginTop: 2 }}
                            type='password'
                            helperText={message}


                        />
                        <S.Button type="submit" variant="contained" sx={{ marginTop: 3 }} >Entrar</S.Button>
                        <Typography sx={{ marginTop: 2 }}>Não tem uma conta? <Link to="/Register">Cadastre-se</Link></Typography>
                    </S.Paper>
                </form>
            </S.BoxRight>
        </S.Container>
    );
}