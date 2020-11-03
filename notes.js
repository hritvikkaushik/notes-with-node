const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("Note added successfully!"));
    } else {
        console.log(chalk.red.inverse("Note title is duplicate!!!"));
    }
    
};

const removeNote = (title) => {
    console.log("Title of note to be removed: " + title);
    const notes =  loadNotes();
    const newNotes = notes.filter((note) => note.title !== title);
    if(newNotes.length === notes.length){
        console.log(chalk.red.inverse("Note not found!!!"));
    } else {
        saveNotes(newNotes);
        console.log(chalk.green.inverse("Note removed successfully!!!"));
    }
};

const listNotes = () => {
    console.log(chalk.cyanBright.inverse("Your notes:"));
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(note.title);
    });
}

const readNotes = (title) => {
    const notes = loadNotes();
    const found = notes.find(note => note.title === title);
    if (found){
        console.log(chalk.green.inverse("Reading note..."));
        console.log(chalk.bold(found.title));
        console.log(found.body);
    } else {
        console.log (chalk.red.inverse("Note not found !!!"));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
};