import { useCallback, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Cards from './components/Cards';
import TextField from '../../components/TextField';
import Navbar from "../../components/NavBar"
import * as S from './styled';
import FakerApi from '../../services/fakerApi.js';
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
    const [idUser, setIdUser] = useState<number | null>(null);
    const [nameUser, setNameUser] = useState<string | null>(null);

    const navigate = useNavigate();

    const getIdUser = useCallback(async () => {
        try {
            const token = await FakerApi.get('/me', {})
            setIdUser(token.data.id);
            setNameUser(token.data.name);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getIdUser();
    }, []);


    const handleLogout = async () => {
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
            setPostArray(listPosts.data);
        } catch (error) {
            console.log(error);
        }
    };


    const handleDeleteComments = useCallback(async (post_id: number) => {
        try {
            await FakerApi.delete('/posts/remove', { post_id: post_id });
            setPostArray(postArray.filter((post) => post.id !== post_id));

        } catch (error) {
            console.log(error);
        } finally {
            getPosts();
            console.log('Post deleted');
        }
    }, []);

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <>
            <S.NavContainer>
                <Navbar onLogout={handleLogout} User={nameUser} />
            </S.NavContainer>
            <S.Container>
                <S.BoxLeft style={{ marginBottom: '20px' }}>
                    <TextField
                        label="Titulo"
                        placeholder='Digite o titulo do post'
                        value={titlePost}
                        onChange={(e) => setTitlePost(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Conteudo"
                        placeholder='Digite o conteudo do post'
                        value={annotationPost}
                        onChange={(e) => setAnnotationPost(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                        rows={4}
                        height="90px"
                    />
                    <Button variant="contained" onClick={handleAddPost} sx={{ marginTop: '90px' }}>
                        Adicionar Post
                    </Button>
                </S.BoxLeft>
                <S.BoxRight id='ConteinerCards'>
                    <div id='box'>
                        {postArray.map((post) => {
                            if (idUser === post.user_id) {
                                return (
                                    <Cards
                                        key={post.id}
                                        title={post.title}
                                        content={post.content}
                                        idPost={post.id}
                                        onExcluir={() => handleDeleteComments(post.id)}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </S.BoxRight>
            </S.Container>

        </>
    )
}