// Created by Bao Vuong, 5/2/2025 11:43AM

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";

export default function SplitAuthLayout(props: {children: ReactNode}) {
  const BACKGROUND_IMAGE_PATH = '/img/wardrobe_background_4.jpg';
  
  const theme = useTheme();
  const mdScreenUp = useMediaQuery(theme.breakpoints.up('md'));

  if (mdScreenUp) {
    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Box
          sx={{
            width: '35%',
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            {props.children}
          </Box>
        </Box>

        <Box
          sx={{
            width: '65%',
            position: 'relative',
            backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(138, 168, 153, 0.5)',
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(138, 168, 153, 0.5)',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 5,
          width: '80%',
          maxWidth: 360,
          p: 4,
          zIndex: 1,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}