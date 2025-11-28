import { Grid, Box, Card, Skeleton, Stack } from "@mui/material";

export default function LoginLoading() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        // Meniru background gradient login asli agar transisi mulus
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          size={{ xs: 12, sm: 12, lg: 4, xl: 3 }}
          display="flex"
          justifyContent="center"
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            {/* Bagian Logo */}
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
              {/* Skeleton Bulat/Persegi untuk Logo */}
              <Skeleton variant="circular" width={50} height={50} animation="wave" />
              <Skeleton variant="text" width={120} height={40} sx={{ ml: 2 }} animation="wave" />
            </Box>

            {/* Bagian Form Inputs (Username & Password) */}
            <Stack spacing={3}>
              <Box>
                <Skeleton variant="text" width="30%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 2 }} animation="wave" />
              </Box>
              
              <Box>
                <Skeleton variant="text" width="30%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={50} sx={{ borderRadius: 2 }} animation="wave" />
              </Box>

              {/* Bagian Checkbox & Forgot Password */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="30%" />
              </Box>

              {/* Bagian Tombol Login */}
              <Skeleton 
                variant="rectangular" 
                height={45} 
                sx={{ borderRadius: 5, mt: 2 }} 
                animation="wave" 
              />
              
              {/* Bagian Subtext bawah */}
              <Box display="flex" justifyContent="center" mt={2}>
                 <Skeleton variant="text" width="60%" />
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}