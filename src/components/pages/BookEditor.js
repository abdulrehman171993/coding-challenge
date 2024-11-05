import React from "react";
import { Container, Button, Typography, List, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useBookEditor } from "../contexts/BookEditorContext";
import Section from "./Section";
import LogoutButton from '../LogoutButton';

const BookEditor = () => {
  const {
    sections,
    selectedId,
    addSection,
    handleSelect,
    handleContentChange,
    currentContent,
  } = useBookEditor();

  return (
    <Container>
      <div style={{ display: "flex", justifyContent:"space-between"}}>
        <Typography variant="h4" gutterBottom>
          Book Outline Editor
        </Typography>
        <LogoutButton />
      </div>
      <div style={{ display: "flex", marginTop: "50px", height: "740px" }}>
        <div
          style={{
            width: "350px",
            borderRight: "1px solid #ccc",
            padding: "10px",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={addSection}
            style={{ marginBottom: "20px" }}
          >
            <Add /> Add Section
          </Button>
          <List>
            {sections.map((section) => (
              <Section
                key={section.id}
                section={section}
                onSelect={handleSelect}
              />
            ))}
          </List>
        </div>
        <div style={{ flexGrow: 1, padding: "20px", height: "100%" }}>
          <TextField
            label="Content"
            multiline
            rows={30}
            fullWidth
            variant="outlined"
            value={currentContent(selectedId)}
            onChange={handleContentChange}
          />
        </div>
      </div>
    </Container>
  );
};

export default BookEditor;
