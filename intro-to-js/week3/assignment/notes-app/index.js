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
  const result = notes.find((obj) => obj.id == id);
  return result;
}

const firstNote = getNote(1);
console.log(firstNote);

const secondNote = getNote(2);
console.log(secondNote);

// My idea: delete a note by id
function deleteNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      notes.splice(i, 1);
      break;
    }
  }
}

saveNote("Make dinner", 3);
saveNote("Water plants", 4);

console.log("After add");
logOutNotesFormatted();

deleteNote(3);

console.log("After delete");
console.log(notes);
logOutNotesFormatted();
