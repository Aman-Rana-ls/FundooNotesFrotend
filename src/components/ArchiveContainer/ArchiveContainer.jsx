import React, { useEffect, useState, useContext } from "react";
import { getArchivedNotes } from "../../utils/Api";
import NoteCard from "../NoteCard/NoteCard";
import { SearchQuery } from "../../App";
import "./ArchiveContainer.scss";

function ArchiveContainer() {
  const [noteList, setNotesList] = useState([]);
  const [refresh, setRefresh] = useState(false); 
  const searchQuery = useContext(SearchQuery);

  useEffect(() => {
    fetchNotes();
  }, [refresh]); 

  const fetchNotes = async () => {
    try {
      const response = await getArchivedNotes();
      if (response.success && Array.isArray(response.data)) {
        setNotesList(response.data);
      } else {
        console.error("Invalid API response format");
      }
    } catch (error) {
      console.error("Error fetching archived notes:", error);
    }
  };

  const updateNotes = (noteId, action) => {
    setNotesList((prevNotes) => {
      if (action === "delete" || action === "permanentDelete") {
        return prevNotes.filter((note) => note.noteId !== noteId);
      } else {
        return prevNotes.map((note) =>
          note.noteId === noteId
            ? { ...note, archived: action === "unarchive" ? false : true }
            : note
        );
      }
    });

    setRefresh((prev) => !prev); 
  };

  const filteredNotes = noteList.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="archive-container">
      {filteredNotes.length > 0 ? (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
            <NoteCard key={note.noteId} noteDetails={note} notes="archive" onNoteAction={updateNotes} />
          ))}
        </div>
      ) : (
        <div className="empty-message">
          <h1>No Archived Notes</h1>
        </div>
      )}
    </div>
  );
}

export default ArchiveContainer;
