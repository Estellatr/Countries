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
  Stack,
  Badge,
} from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import ToggleColorMode from "../../App";
import { darkTheme } from "../../styling/theme";

export const Header = () => {
  const countries = useAppSelector((state) => {
    return state.countries;
  });

  const numberOfFavorites = countries.countries.filter(
    (country) => country.isFavorite
  ).length;

  return (
      <Box sx={{ flexGrow: 1, bgcolor: "primary.main" }} >
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="secondary"
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
            <Button color="primary">
              <Link component={RouterLink} to="/favourites">
                <Stack spacing={2} direction="row">
                  <Badge badgeContent={numberOfFavorites} color="secondary">
                    <Box color="secondary.main">
                    <FavoriteIcon />
                    </Box>
                  </Badge>
                </Stack>
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
  );
};
