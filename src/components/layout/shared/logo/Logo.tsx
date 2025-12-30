import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Logo = ({ useLink = false }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link href={useLink ? "/" : ""} style={{ textDecoration: "none", width: '100%' }}>
        
        <Box 
          sx={{ 
            display: "flex",        
            alignItems: "center",   
            width: "100%",          
            overflow: "hidden"      
          }}
        >
          <Image
            src="/images/logos/logo.png"
            alt="Logo PDAM"
            width={50}
            height={50}
            style={{ flexShrink: 0 }}
            priority
          />
          
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column", // Ini kuncinya: menyusun item dari atas ke bawah
              justifyContent: "center", // Opsional: mengatur posisi vertikal
              alignItems: "flex-start"  // Opsional: 'flex-start' (kiri), 'center' (tengah), 'flex-end' (kanan)
            }}
          >
            {/* 2. Item Pertama (Atas) */}
            <Typography 
              variant="h5"
              sx={{ 
                fontWeight: "bold",
                lineHeight: 1.2,
                background: "linear-gradient(to right, #5D87FF, #49beff)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden"
              }}
            >
              SIPAMIT
            </Typography>

            {/* 3. Item Kedua (Bawah) */}
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: "bold",
                fontSize: "12px", 
                lineHeight: 1.2,
                color: "text.secondary" // Tips: Gunakan warna sekunder agar hirarkinya jelas
              }}
            >
              Portal
            </Typography>
          </Box>
        </Box>

      </Link>
    </Box>
  );
};

export default Logo;