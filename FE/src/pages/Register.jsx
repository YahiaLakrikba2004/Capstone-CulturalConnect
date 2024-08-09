import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
});

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Box 
      sx={{
        backgroundImage: 'url(https://info.ehl.edu/hubfs/Cultural-Diversity-Accomodation.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: 24,
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            zIndex: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              background: 'linear-gradient(to right, #ff8a65, #ff6f61)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              mt: 2,
              mb: 2,
              mx: 6,
              display: 'inline-block',
              padding: '0 0.5rem',
            }}
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              username: '',
              password: '',
              email: '',
              role: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                await axios.post('http://localhost:8080/api/auth/register', values);
                navigate('/login');
              } catch (error) {
                console.error('Error creating user:', error.response ? error.response.data : error.message);
                setStatus('Error creating user');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status, touched, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Username"
                  name="username"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="username" />}
                  error={Boolean(touched.username && errors.username)}
                  InputProps={{
                    style: { borderColor: Boolean(touched.username && errors.username) ? 'red' : undefined }
                  }}
                />
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(touched.password && errors.password)}
                  InputProps={{
                    style: { borderColor: Boolean(touched.password && errors.password) ? 'red' : undefined }
                  }}
                />
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(touched.email && errors.email)}
                  InputProps={{
                    style: { borderColor: Boolean(touched.email && errors.email) ? 'red' : undefined }
                  }}
                />
                <Field
                  as={TextField}
                  label="Role"
                  name="role"
                  select
                  fullWidth
                  margin="normal"
                  helperText={<ErrorMessage name="role" />}
                  error={Boolean(touched.role && errors.role)}
                  InputProps={{
                    style: { borderColor: Boolean(touched.role && errors.role) ? 'red' : undefined }
                  }}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Field>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 16 }}
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
                <Typography color="error" align="center" style={{ marginTop: 16 }}>
                  {status && <div>{status}</div>}
                </Typography>
              </Form>
            )}
          </Formik>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <a 
                href="/login" 
                style={{ 
                  display: 'inline-block', 
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  background: 'linear-gradient(to right, #ff8a65, #ff6f61)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease, color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff6f61'}
                onMouseLeave={(e) => e.target.style.color = 'transparent'}
              >
                Login here
              </a>
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
