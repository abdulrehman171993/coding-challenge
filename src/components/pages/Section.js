import React, { useState } from "react";
import {
  ListItem,
  TextField,
  Button,
  Popover,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Add, MoreVert, ExpandMore } from "@mui/icons-material";
import { useBookEditor } from "../contexts/BookEditorContext";
import Subsection from "./Subsection";

const Section = ({ section }) => {
  const { updateSectionTitle, addSubsection, handleSelect } = useBookEditor();
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    updateSectionTitle(section.id, newTitle);
  };

  const handleSingleClick = () => {
    handleSelect(section.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleAccordionChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      {section.subsections.length > 0 ? (
        <Accordion
          expanded={expanded}
          sx={{
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore onClick={handleAccordionChange} />}
            sx={{
                flexDirection: 'row-reverse',
              }}
          >
            <ListItem
              style={{ display: "flex", alignItems: "center", flexGrow: 1 }}
              onClick={handleSingleClick}
              onDoubleClick={handleDoubleClick}
            >
              {isEditing ? (
                <TextField
                  style={{ width: "100%" }}
                  value={section.title}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Typography style={{ width: "100%" }} variant="body1">
                  {section.title}
                </Typography>
              )}
              <Button onClick={handlePopoverOpen} size="small">
                <MoreVert />
              </Button>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List style={{ paddingLeft: "20px" }}>
              {section.subsections.map((subsection) => (
                <Subsection key={subsection.id} subsection={subsection} />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <ListItem
          button
          onClick={handleSingleClick}
          onDoubleClick={handleDoubleClick}
          style={{ display: "flex", alignItems: "center" }}
        >
          {isEditing ? (
            <TextField
              value={section.title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              variant="outlined"
              fullWidth
            />
          ) : (
            <Typography style={{ width: "100%" }} variant="body1">{section.title}</Typography>
          )}
          <Button onClick={handlePopoverOpen} size="small">
            <MoreVert />
          </Button>
        </ListItem>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Button
          onClick={() => {
            addSubsection(section.id);
            handlePopoverClose();
          }}
        >
          <Add /> Add Subsection
        </Button>
      </Popover>
    </>
  );
};

export default Section;
