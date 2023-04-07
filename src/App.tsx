import { useState } from 'react';
import { Box, Paper, useTheme } from "@mui/material";
import "reflect-metadata";
import { TopBar } from './components/top-bar/top-bar';
import { LeadsTable } from "./components/leads-table/leads-table";
import { UploadsTable } from './components/uploads-table/uploads-table';
import { UploadFile } from './components/upload-file';
import "./App.css";

interface LeadTypes {
  leadId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  upload?: number;
  creationDate: string;
}

interface LeadTypes {
  uploadId: number;
  entries: number;
  creationDate: string;
}

function App() {
  const [items, setItems] = useState<LeadTypes[]>([]);
  const [uploads, setUploads] = useState<LeadTypes[]>([]);  
  const theme = useTheme();

  const styles = {
    app: {
      position: "relative",
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#eeeeee",
      padding: 2,
      boxSizing: "border-box",
    },
    appInner: {
      paddingTop: "30px",
      marginTop: "30px",
      display: "flex",
      alignItems: "center",
    },
    box: {
      maxWidth: { xs: "100%", sm: "80vw" },
      width: "100%",
      margin: "0 auto 16px",
      padding: "16px",
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: "10px",
    },
    adress: {
      display: "flex",
      fontSize: "0.9rem",
      fontWeight: 700,
      color: theme.palette.primary.main,
      margin: "16px auto 0",
      textAlign: "center",
      minHeight: "1.8rem",
      wordBreak: "break-all",
    },
    input: {
      marginTop: "16px",
      marginBottom: "16px",
      "& .MuiInput-underline:after": {
        color: theme.palette.primary.main,
      },
    },
    filesWrapper: {
      backgroundColor: theme.palette.primary.contrastText,
      boxSizing: "border-box",
    },
  };

  return (
    <Box sx={styles.app}>
      <TopBar />
      <Box sx={styles.appInner}>
        <Paper sx={styles.box}>
          <Box>
            <UploadFile setItems={setItems} setUploads={setUploads} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <LeadsTable items={items} />
          </Box>
          <Box sx={styles.filesWrapper}>
            <UploadsTable items={uploads} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default App
