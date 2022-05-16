import React from "react";
import { AppBar, Box, Container, CssBaseline, styled, Toolbar } from "@mui/material";
import Header from "./Header";

const MainLayout: React.FC<{ children?: React.ReactNode | undefined }> = ({
  children,
}) => {
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <Offset />
      <Container component="main" maxWidth="xl">
          <Box mt={3}>
          {children}
          </Box>
      </Container>
    </>
  );
};

export default MainLayout;
