import { useEffect, useState } from "react";

function NotesPage() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("myNotes")) || [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Personal");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and note content.");
      return;
    }

    if (editingId !== null) {
      setNotes(notes.map(note =>
        note.id === editingId
          ? {
              ...note,
              title,
              content,
              category,
              updatedAt: new Date().toLocaleString()
            }
          : note
      ));

      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        category,
        updatedAt: new Date().toLocaleString()
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
    setCategory("Personal");
  }

  function editNote(note) {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setEditingId(note.id);
  }

  function deleteNote(id) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter(note => note.id !== id));

      if (editingId === id) {
        clearForm();
      }
    }
  }

  function clearForm() {
    setTitle("");
    setContent("");
    setCategory("Personal");
    setEditingId(null);
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filter === "All" || note.category === filter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="notes-container">

      <h2>My Notes</h2>

      <p className="subtitle">
        Organize your thoughts and ideas
      </p>

      <div className="notes-stats">
        <div className="stat-card">
          <h3>{notes.length}</h3>
          <p>Total Notes</p>
        </div>

        <div className="stat-card">
          <h3>{notes.filter(n => n.category === "Work").length}</h3>
          <p>Work</p>
        </div>

        <div className="stat-card">
          <h3>{notes.filter(n => n.category === "Personal").length}</h3>
          <p>Personal</p>
        </div>
      </div>

      <form className="notes-form" onSubmit={handleSubmit}>

        <h3>
          {editingId !== null ? "Edit Note" : "Create New Note"}
        </h3>

        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows="5"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
        </select>

        <div className="notes-form-actions">
          <button type="submit">
            {editingId !== null ? "Update Note" : "Add Note"}
          </button>

          {editingId !== null && (
            <button
              type="button"
              className="cancel-btn"
              onClick={clearForm}
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      <div className="notes-search">
        <input
          type="text"
          placeholder="Search your notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        {["All", "Personal", "Work", "Study"].map(item => (
          <button
            key={item}
            className={filter === item ? "active-filter" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="notes-list">

        {filteredNotes.length === 0 ? (
          <div className="empty-message">
            No notes found. Create your first note!
          </div>
        ) : (
          filteredNotes.map(note => (
            <div className="note-card" key={note.id}>

              <div className="note-card-header">
                <h3>{note.title}</h3>
                <span className="note-category">
                  {note.category}
                </span>
              </div>

              <p className="note-content">
                {note.content}
              </p>

              <small className="note-date">
                Last updated: {note.updatedAt}
              </small>

              <div className="note-actions">
                <button onClick={() => editNote(note)}>
                  Edit
                </button>

                <button onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default NotesPage;