import { ThemeProvider } from "@emotion/react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { lightTheme } from "../../styling/theme";

export const Footer = () => {
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <Box sx={{ flexGrow: 1, 
    bottom: 0, width: '100%'}}>
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
