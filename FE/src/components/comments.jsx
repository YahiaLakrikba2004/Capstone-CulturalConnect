import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  CircularProgress,
  Box,
  Alert,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/comments/${articleId}`);
      setComments(response.data);
    } catch (err) {
      setError('Errore nel recupero dei commenti.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      setLoading(true);
      try {
        await axios.post('http://localhost:8080/api/comments', { articleId, text: newComment });
        setNewComment('');
        await fetchComments(); 
      } catch (err) {
        setError("Errore nell'aggiunta del commento.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await axios.post(`http://localhost:8080/api/comments/${commentId}/like`);
      await fetchComments(); 
    } catch (err) {
      setError('Errore nel mettere mi piace al commento.');
    }
  };
  
  const handleUnlikeComment = async (commentId) => {
    try {
      await axios.post(`http://localhost:8080/api/comments/${commentId}/unlike`);
      await fetchComments(); 
    } catch (err) {
      setError('Errore nel rimuovere mi piace dal commento.');
    }
  };
  ;


  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary">
          Caricamento commenti...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Commenti
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem>
                <ListItemText
                  primary={comment.text}
                  secondary={`Creato il ${new Date(comment.createdAt).toLocaleString()}`}
                />
                <IconButton
                  color={comment.liked ? 'primary' : 'default'}
                  onClick={() => {
                    comment.liked
                      ? handleUnlikeComment(comment.id)
                      : handleLikeComment(comment.id);
                  }}
                >
                  {comment.liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                </IconButton>
                <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                  {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Nessun commento disponibile.
          </Typography>
        )}
      </List>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Aggiungi un commento"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={handleCommentChange}
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddComment}
          sx={{ mt: 2 }}
        >
          Aggiungi Commento
        </Button>
      </Box>
    </Box>
  );
};

export default Comments;
