import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import FakerApi from '../../../../services/fakerApi.js';
import * as S from './styled';

interface CardsProps {
  title: string;
  content: string;
  idPost: number;
  onExcluir: () => void;
}

interface Comment {
  id: number;
  content: string;
  user_id: number;
}

export default function Cards({ title, content, idPost, onExcluir }: CardsProps): JSX.Element {
  const [editActive, setEditActive] = useState(false);
  const [editActiveComment, setEditActiveComment] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newEditComment, setNewEditComment] = useState('');
  const [commentBeingEdited, setCommentBeingEdited] = useState<number | null>(null);


  const handleEditar = () => {
    setEditActive(true);
    setEditTitle(title);
    setEditContent(content);
  };

  const handleEditComments = (content: string, commentId: number) => {
    setEditActiveComment(true);
    setNewEditComment(content);
    setCommentBeingEdited(commentId);
  };

  const handleCancelEdit = () => {
    setEditActive(false);
  };



  const handleSaveEdit = useCallback(async () => {
    try {
      const response = await FakerApi.put('/posts/update', { post_id: idPost, post: { title: editTitle, content: editContent } });
      console.log('Post updated', response);
    } catch (error) {
      console.log(error);
    } finally {
      setEditActive(false);
    }


  }, [editTitle, editContent, idPost]);


  const getComments = async () => {
    try {
      const listComments = await FakerApi.get('/comments', { post_id: idPost })
      setComments(listComments.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleAddComment = async () => {
    try {
      await FakerApi.post('/comments/create', {
        post_id: idPost,
        comment: { content: newComment }
      });
      getComments();
      setNewComment('');
      console.log('Comment added');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComments = useCallback(async (comment_id: number) => {
    try {
      await FakerApi.delete('/comments/remove', { post_id: idPost, comment_id: comment_id });
    } catch (error) {
      console.log(error);
    } finally {
      getComments();
      console.log('Comment deleted');
    }
  }, []);


  const handleSaveEditComments = async () => {
    try {
      const response = await FakerApi.put('/comments/update', {
        post_id: idPost,
        comment_id: commentBeingEdited,
        comment: { content: newEditComment }
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentBeingEdited
            ? { ...comment, content: newEditComment }
            : comment
        )
      );
      setEditActiveComment(false);
      setCommentBeingEdited(null);
      setNewEditComment('');
      console.log('Comment updated', response);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Card id='Card'
        variant="outlined" sx={{
          width: '500px',
          backgroundColor: '#bdc8dd67 ',
          marginTop: '10px',
        }}>
        <CardContent >
          {editActive ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                multiline
                fullWidth
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                margin='normal'
              />
              <TextField
                multiline
                fullWidth
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                margin='normal'
              />
            </div>

          ) : (
            <>
              <Typography variant="h4" whiteSpace={'break-spaces'}>{editTitle}</Typography>
              <Typography variant="body2" whiteSpace={'break-spaces'} sx={{ marginTop: '10px' }}>{editContent}</Typography>
            </>

          )}
          <S.ButtonsEdit>
            {editActive ? (
              <>
                <Button onClick={handleSaveEdit} size="small" color='secondary'>
                  Salvar
                </Button>
                <Button onClick={handleCancelEdit} size="small" color='secondary'>
                  Cancelar
                </Button>
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
          </S.ButtonsEdit>
          <S.ButtonsEdit style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              placeholder="Adicione um comentário"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" onClick={handleAddComment} size="small" sx={{ padding: '5px' }}>
              Adicionar Comentário
            </Button>
            {comments.length > 0 && (
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                Listagem de comentários
              </Typography>
            )}

            {comments.map((comment) => (
              <div key={comment.id}>
                {commentBeingEdited === comment.id && editActiveComment ? (
                  <TextField
                    fullWidth
                    value={newEditComment}
                    onChange={(e) => setNewEditComment(e.target.value)}
                    margin="normal"
                  />
                ) : (
                  <div>
                    <S.Span>{comment.content}</S.Span>
                  </div>
                )}
                <S.ButtonsEdit>
                  {commentBeingEdited === comment.id && editActiveComment ? (
                    <>
                      <IconButton onClick={handleSaveEditComments} size="small">
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setEditActiveComment(false);
                          setCommentBeingEdited(null);
                          setNewEditComment('');
                        }}
                        size="small"
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditComments(comment.content, comment.id)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteComments(comment.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </S.ButtonsEdit>
              </div>
            ))}
          </S.ButtonsEdit>
        </CardContent>
      </Card>
    </div>
  );
}


