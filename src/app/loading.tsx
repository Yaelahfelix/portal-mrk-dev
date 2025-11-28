// app/loading.tsx
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingGlobal() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        height: '100vh', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default' // Menyesuaikan tema (gelap/terang)
      }}
    >
      {/* Loading berputar khas Material UI */}
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}