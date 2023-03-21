import { Link as RouterLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { themeOptions } from "./theme";

export const Header = () => {
  return (
    <ThemeProvider theme={themeOptions}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {" "}
              <Link component={RouterLink} to={"/"}>
                Countries
              </Link>
            </Typography>
            <Button color="inherit">
              <Link component={RouterLink} to="/favourites">
                <FavoriteIcon />
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};
