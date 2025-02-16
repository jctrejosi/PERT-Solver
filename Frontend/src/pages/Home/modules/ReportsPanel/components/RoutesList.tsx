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
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useAppSelector } from "@store/hooks";

export default function RoutesList() {
  const routes = useAppSelector((state) => state.home.routes);
  const theme = useTheme();

  // Determinar cuántas columnas mostrar según el tamaño de la pantalla
  const isSmall = useMediaQuery(theme.breakpoints.down("sm")); // Pantallas pequeñas (1 columna)
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md")); // Medianas (2 columnas)
  const isLarge = useMediaQuery(theme.breakpoints.up("md")); // Grandes (3 columnas)

  const columns = isSmall ? 1 : isMedium ? 2 : isLarge ? 3 : 1;

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%", padding: 2 }}>
      <Grid container spacing={2}>
        {routes.map((route, index) => (
          <Grid item xs={12 / columns} key={index}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
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
