const notes = [];

function saveNote(content, id) {
  notes.push({ id: id, content: content });
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes);

function logOutNotesFormatted() {
  console.log("Notes:");
  for (const note of notes) {
    console.log(
      `The note with id: ${note.id}, has the following note text: ${note.content}`
    );
  }
}

logOutNotesFormatted();

function getNote(id) {
  if (id === undefined || id === null) {
    return null;
  }
  const result = notes.find((obj) => obj.id === id);
  if (!result) {
    return null;
  }
  return result;
}

const firstNote = getNote(1);
console.log("First note", firstNote);

const secondNote = getNote(2);
console.log("Second note", secondNote);

// My idea: delete a note by id
function deleteNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      notes.splice(i, 1);
      break; // Found note[i], so we can break; no need to check the remaining items.
    }
  }
}

saveNote("Make dinner", 3);
saveNote("Water plants", 4);

const thirdNote = getNote();
console.log("Third note", thirdNote);

const note = getNote(5);
if (!note) {
  console.log('Note missing');
}

console.log("After add");
logOutNotesFormatted();

deleteNote(3);

console.log("After delete");
console.log(notes);
logOutNotesFormatted();
