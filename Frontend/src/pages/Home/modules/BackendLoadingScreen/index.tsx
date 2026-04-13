import { Box, CircularProgress, Typography } from "@mui/material";

export function BackendLoadingScreen() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1">Iniciando servidor...</Typography>
    </Box>
  );
}
