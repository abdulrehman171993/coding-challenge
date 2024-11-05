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

const Subsection = ({ subsection }) => {
  const { updateSubsectionTitle, addSubsection, handleSelect } =
    useBookEditor();
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    updateSubsectionTitle(subsection.id, newTitle);
  };

  const handleSingleClick = () => {
    handleSelect(subsection.id);
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
      {subsection.subsections.length > 0 ? (
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
                  value={subsection.title}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  variant="outlined"
                  fullWidth
                />
              ) : (
                <Typography variant="body2" style={{ width: "100%" }}>
                  {subsection.title || "Subsection Title"}
                </Typography>
              )}
              <Button onClick={handlePopoverOpen} size="small">
                <MoreVert />
              </Button>
            </ListItem>
          </AccordionSummary>
          <AccordionDetails>
            <List style={{ paddingLeft: "20px" }}>
              {subsection.subsections.map((childSubsection) => (
                <Subsection
                  key={childSubsection.id}
                  subsection={childSubsection}
                />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <ListItem
          button
          onClick={handleSingleClick}
          onDoubleClick={handleDoubleClick}
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          {isEditing ? (
            <TextField
              style={{ width: "100%" }}
              value={subsection.title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              variant="outlined"
              fullWidth
            />
          ) : (
            <Typography variant="body2" style={{ width: "100%" }}>
              {subsection.title || "Subsection Title"}
            </Typography>
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
            addSubsection(subsection.id);
            handlePopoverClose();
          }}
        >
          <Add /> Add Subsection
        </Button>
      </Popover>
    </>
  );
};

export default Subsection;
