'use client'

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/navigation';  

export default function Component() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'asmobility2024') {
      router.push('/admin/tables'); 
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#1a1a1a" color="white">
      <Box maxWidth="400px" width="100%" padding="24px" bgcolor="#000000" borderRadius="8px">
        <Typography variant="h4" align="center" gutterBottom>Iniciar sesión</Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>Ingresa tus credenciales</Typography>
        
        <TextField
          fullWidth
          margin="normal"
          id="username"
          label="Usuario"
          variant="outlined"
          value={username}  
          onChange={(e) => setUsername(e.target.value)}  
          InputLabelProps={{ style: { color: '#969696' } }}
          inputProps={{ style: { color: '#969696' } }}
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555555' } } }}
        />
        
        <TextField
          fullWidth
          margin="normal"
          id="password"
          label="Contraseña"
          type="password"
          variant="outlined"
          value={password}  // Vínculo con el estado
          onChange={(e) => setPassword(e.target.value)}  
          InputLabelProps={{ style: { color: '#969696' } }}
          inputProps={{ style: { color: '#969696' } }}
          sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555555' } } }}
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleLogin} 
        >
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  );
}
