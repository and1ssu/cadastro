import React, { useEffect, useState } from 'react';
import { Button, Container,  Typography } from '@mui/material';
import Cards from '../../components/Cards';
import TextField from '../../components/TextField';
import Navbar from "../../components/NavBar"
import * as S from './styled';
import FakerApi from '../../services/fakerApi';
import { useNavigate } from 'react-router-dom';

interface TPost {
    title: string;
    content: string;
    id: number;
    user_id: number;
}


export default function Dashboard() {
    const [postArray, setPostArray] = useState<TPost[]>([]);
    const [titlePost, setTitlePost] = useState('');
    const [annotationPost, setAnnotationPost] = useState('');
    const navigate = useNavigate();
console.log('POSTS',postArray);
    const handleLogout = async() => {
        try {
            await FakerApi.post('/logout', {});
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem('token');
            navigate('/')
            console.log('Logged out');
        }

    };

    useEffect(() => {
        getPosts();
    }, []);


    const handleAddPost = async () => {
        try {
            await FakerApi.post('/posts/create', { title: titlePost, content: annotationPost });
        } catch (error) {
            console.log(error);
        } finally {
            getPosts();
            setAnnotationPost('');
            setTitlePost('');
            console.log('Post created');
        }
    };

    const getPosts = async () => {
        try {
            const listPosts = await FakerApi.get('/posts', {});
            console.log(listPosts);
            setPostArray(listPosts.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditarComentario = async (post_id: number, title: string, content: string) => {
        try {
            await FakerApi.put('/posts/update', { post_id: post_id, post: { title: title, content: content } });
        } catch (error) {
            console.log(error);
        } finally {
            getPosts();
            console.log('Post updated');
        }
        const novosComentarios = [...postArray];
        novosComentarios[indice].annotation = novoTexto;
        setPostArray(novosComentarios);
    };

    const handleExcluirComentario = async (post_id: number) => {
        try{
            await FakerApi.delete('/posts/remove', { post_id: post_id })
        } catch (error) {
            console.log(error);
        } finally {
            getPosts();
            console.log('Post deleted');
        }
    };


    return (
        <>
            <S.NavContainer>
                <Navbar onLogout={handleLogout} />
            </S.NavContainer>
            <S.Container>
                <S.BoxLeft style={{ marginBottom: '20px' }}>
                    <TextField
                        label="Titulo"
                        value={titlePost}
                        onChange={(e) => setTitlePost(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Comentário"
                        value={annotationPost}
                        onChange={(e) => setAnnotationPost(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                        height="90px"
                    />
                    <Button variant="contained" onClick={handleAddPost}>
                        Adicionar Post
                    </Button>
                </S.BoxLeft>
                <S.BoxRight>
                    {postArray.map((post, index) => (
                        <Cards
                            key={index}
                            title={post.title}
                            content={post.content}
                            onEditar={() => handleEditarComentario(post.id, post.title, post.content)}
                            onExcluir={() => handleExcluirComentario(post.id)}
                        />
                    ))}
                </S.BoxRight>
            </S.Container>

        </>
    )
}