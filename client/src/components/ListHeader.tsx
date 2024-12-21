import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface ListHeaderProps {
    title?: string | null;
    description?: string | null;
}

const ListHeader: React.FC<ListHeaderProps> = ({title = null, description = null}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ marginBottom: 4 }} // Margines dolny dla przestrzeni
    >
      {/* Papierowy blok z tytułem */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: "#f5f5f5", // Jasnoszary kolor tła
          borderRadius: 2, // Zaokrąglone rogi
          textAlign: "center", // Wyśrodkowanie tekstu
          width: "100%", // Szerokość 100% rodzica
          maxWidth: "600px", // Maksymalna szerokość
        }}
      >
        { title &&
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            {title}
            </Typography>
        }
        { description &&
            <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
                {description}
            </Typography>
        }
      </Paper>
    </Box>
  );
};

export default ListHeader;