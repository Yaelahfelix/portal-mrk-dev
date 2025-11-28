import { 
  Box, 
  Stack, 
  Skeleton, 
  Grid,
  Card, 
  CardContent 
} from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        py: 4,
        px: 3,
      }}
    >
      <Stack spacing={4}>
        
        {/* 1. HERO SECTION SKELETON */}
        {/* Kita buat kotak besar yang ukurannya sama dengan Card Hero di halaman asli */}
        <Skeleton 
          variant="rectangular" 
          height={240} 
          animation="wave" 
          sx={{ borderRadius: 4 }} 
        />

        {/* 2. APPLICATIONS GRID SECTION */}
        <Box>
          {/* Judul Section (misal: "Pilih Aplikasi") */}
          <Skeleton 
            variant="text" 
            width={200} 
            height={40} 
            sx={{ mb: 3 }} 
          />

          {/* Grid Container */}
          <Grid container spacing={3}>
            {/* Kita buat array palsu sebanyak 6 item untuk simulasi kartu */}
            {[...Array(6)].map((_, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                
                {/* 3. CARD SKELETON */}
                {/* Kita bentuk agar mirip dengan Card aplikasi aslinya */}
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    minHeight: 280,
                    borderRadius: 3,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Bagian Header Card (Icon/Avatar) */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                       <Skeleton variant="circular" width={56} height={56} animation="wave" />
                    </Box>

                    {/* Bagian Judul Aplikasi */}
                    <Skeleton 
                        variant="text" 
                        height={32} 
                        width="60%" 
                        animation="wave" 
                        sx={{ mb: 1.5 }} 
                    />

                    {/* Bagian Deskripsi Aplikasi (2 baris) */}
                    <Skeleton variant="text" height={20} width="100%" animation="wave" />
                    <Skeleton variant="text" height={20} width="80%" animation="wave" />
                  </CardContent>
                </Card>

              </Grid>
            ))}
          </Grid>
        </Box>

      </Stack>
    </Box>
  );
}