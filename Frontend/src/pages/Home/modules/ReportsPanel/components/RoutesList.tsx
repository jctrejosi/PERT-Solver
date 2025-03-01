import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@store/hooks";

export default function RoutesList() {
  const routes = useAppSelector((state) => state.home.routes);
  const expected_time = useAppSelector((state) => state.home.expected_time);
  const theme = useTheme();

  // Determinar cuántas columnas mostrar según el tamaño de la pantalla
  const isSmall = useMediaQuery(theme.breakpoints.down("sm")); // Pantallas pequeñas (1 columna)
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md")); // Medianas (2 columnas)
  const isLarge = useMediaQuery(theme.breakpoints.up("md")); // Grandes (3 columnas)

  const columns = isSmall ? 1 : isMedium ? 2 : isLarge ? 3 : 1;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%", padding: 2 }}>
      <Grid container>
        {routes.map((route, index) => (
          <Grid item xs={12 / columns} key={index}>
            <List sx={{ padding: 0 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor:
                        expected_time < route.completion_time
                          ? theme.palette.error.main
                          : theme.palette.primary.main,
                      padding: 0.5,
                      color: theme.palette.primary.light,
                    }}
                  >
                    <Typography>{route.completion_time}</Typography>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={route.route} />
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
