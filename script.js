
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const notesList = document.getElementById('notesList');

let editIndex = null; 


function saveNotesAsync(notes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('notes', JSON.stringify(notes));
            resolve();
        }, 1000); 
    });
}

function loadNotesAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            resolve(notes);
        }, 1000); 
    });
}


async function addOrUpdateNote() {
    const noteText = noteInput.value.trim();
    if (!noteText) return alert('Please enter a note.');

    const notes = await loadNotesAsync();
    if (editIndex !== null) {
        
        notes[editIndex] = noteText;
        editIndex = null; 
        saveNoteBtn.textContent = 'Save Note'; 
    } else {
        
        notes.push(noteText);
    }

    await saveNotesAsync(notes);
    noteInput.value = '';
    renderNotes();
}


async function renderNotes() {
    const notes = await loadNotesAsync();
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
    
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';

        
        const noteContent = document.createElement('div');
        noteContent.className = 'note-content';
        noteContent.textContent = note;

        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'button edit-btn';
        editBtn.addEventListener('click', () => editNote(index));

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'button delete-btn';
        deleteBtn.addEventListener('click', () => deleteNote(index));

        
        const buttons = document.createElement('div');
        buttons.className = 'buttons';
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);

        
        noteCard.appendChild(noteContent);
        noteCard.appendChild(buttons);

    
        notesList.appendChild(noteCard);
    });
}


async function deleteNote(index) {
    const notes = await loadNotesAsync();
    notes.splice(index, 1); 

    await saveNotesAsync(notes);
    renderNotes();
}


async function editNote(index) {
    const notes = await loadNotesAsync();
    noteInput.value = notes[index]; 
    editIndex = index; 
    saveNoteBtn.textContent = 'Update Note'; 
}


saveNoteBtn.addEventListener('click', addOrUpdateNote);
window.addEventListener('load', renderNotes); 
