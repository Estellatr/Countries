import { ThemeProvider } from "@emotion/react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { themeOptions } from "./theme";

export const Footer = () => {
  return (
    <div>
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
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {" "}
                <ul>
                  <li>Contact Us</li>
                  <li>Social Media</li>
                </ul>
              </Typography>
              <Button color="inherit"></Button>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  );
};
