import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const NoteService = {
    query,
    getNoteById,
    saveTxt,
    removeNote,
    setColor,
    setNotePin,
    todoDone,
    allTodosDone,
    _createNote: _createNoteTxt,
    addNote,
    duplicateNote,
}

const KEY = 'notesDB';
const DELETED_KEY = 'deletedNotesDB';

var gNotes = []
var gdeletedNotes = []


// function removeNote(noteId) {
//     gNotes = gNotes.filter(note => note.id !== noteId)
//     _saveNotesToStorage()
//     return Promise.resolve(gNotes)
// }

function removeNote(noteId) {
    var noteIdx = gNotes.findIndex(function(note) {
        return noteId === note.id
    })
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage();
    return Promise.resolve(gNotes)
}

function saveTxt(noteId, val) {
    getNoteById(noteId)
        .then(note => {
            if (note.type === 'note-txt') note.info.txt = val;
            else if (note.type === 'note-img' || note.type === 'note-video') note.info.txt = val;

            _saveNotesToStorage()
        })
}

function duplicateNote(note) {
    const newNote = JSON.parse(JSON.stringify(note));
    newNote.id = utilService.makeId()
    gNotes.push(newNote)
    _saveNotesToStorage()
    return Promise.resolve(gNotes)
}


function getNoteById(noteId) {
    var note = gNotes.find(note => {
        return noteId === note.id
    })
    return Promise.resolve(note)
}

function setColor(noteId, color) {
    getNoteById(noteId)
        .then(note => {
            note.style.backgroundColor = color;
            _saveNotesToStorage()
        })

}

function setNotePin(noteId) {
    getNoteById(noteId)
        .then(note => {
            note.isPinned = !note.isPinned;
            _saveNotesToStorage()
        })
    return Promise.resolve();
}

function allTodosDone(noteId) {
    getNoteById(noteId)
        .then(note => {
            note.isDone = !note.isDone;
            _saveNotesToStorage()
        })
}

function todoDone(noteId, todos, todoIdx) {
    getNoteById(noteId)
        .then(note => {
            note.info.todos[todoIdx].doneAt = todos[todoIdx].doneAt
            _saveNotesToStorage()
        })
}

function getNoteById(noteId) {
    const note = gNotes.find(note => note.id === noteId)
    return Promise.resolve(note)
}

function addNote(inputInfo) {
    const { txt } = inputInfo;
    let note;
    if (inputInfo.type === 'note-txt') note = _createNoteTxt(txt)
    else if (inputInfo.type === 'note-img') note = _createNoteImg('note-img', txt)
    else if (inputInfo.type === 'note-video') note = _createNoteImg('note-video', txt)
    else note = _createNoteTodos(txt)
    gNotes.unshift(note);
    _saveNotesToStorage();
    return Promise.resolve(gNotes)
}

function _createNoteTxt(txt) {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt,
        },
        style: {
            backgroundColor: utilService.getRandomColor()
        }
    }
}

function _createNoteImg(type, url) {
    return {
        id: utilService.makeId(),
        isPinned: false,
        type,
        info: {
            url,
            txt: "",
        },
        style: {
            backgroundColor: utilService.getRandomColor()
        }
    }
}

function _createNoteTodos(txt) {


    const notesTodos = {
        type: 'note-todos',
        id: utilService.makeId(),
        isPinned: false,
        isDone: false,
        info: {},
        style: {
            backgroundColor: utilService.getRandomColor(),
        }

    }


    const todos = []
    notesTodos.info.txt = txt.split(',')[0]
    const newTtx = txt.split(',').slice(1).join(',')
    const userTodos = newTtx.split(',')
    userTodos.forEach(todo => {
        todos.push({
            txt: todo,
            doneAt: null,
            id: utilService.makeId()
        })
    })

    notesTodos.info.todos = todos
    return notesTodos;
}

_createNotes()

function _createNotes() {
    var notes = storageService.loadFromStorage(KEY);
    if (!notes || !notes.length) {
        notes = [{
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "rgb(229 227 74)"
                }
            },
            {
                id: "n102",
                isPinned: false,
                type: "note-img",
                info: {
                    url: "https://i.picsum.photos/id/933/200/300.jpg?hmac=8zdipGWKGkHz8wyA9J63P3fzghuUL9wqV5Y34b8mLTI",
                    txt: "smoke on ground",
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
                isPinned: false,
                type: "note-todos",
                isDone: false,
                info: {
                    txt: "Get my shit together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null, id: utilService.makeId() },
                        { txt: "Coding power", doneAt: 187111111, id: utilService.makeId() }
                    ]
                },
                style: {
                    backgroundColor: "rgb(75 168 88)"
                }
            },
            {
                id: "n104",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "tommyyyyyyy stommmmmmm"
                },
                style: {
                    backgroundColor: "rgb(75 168 88)"
                }
            },
            {
                id: "n105",
                isPinned: false,
                type: "note-video",
                info: {
                    url: "https://www.youtube.com/embed/H1HdZFgR-aA",
                    txt: ''
                },
                style: {
                    backgroundColor: "#f44336"
                }
            },
            {
                id: "n106",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Eat Sleep React Repeat"
                },
                style: {
                    backgroundColor: "rgb(98 98 192)"
                }
            },
            {
                id: "n107",
                isPinned: false,
                type: "note-video",
                info: {
                    url: "https://giphy.com/embed/3oriO7A7bt1wsEP4cw",
                    txt: 'back heand'
                },
                style: {
                    backgroundColor: "#f44336"
                }
            },
            {
                id: "n108",
                isPinned: true,
                type: "note-video",
                info: {
                    url: "https://giphy.com/embed/hjUYcGyhsGvI7not7w/video",
                    txt: 'sprint 3 be like'
                },
                style: {
                    backgroundColor: "rgb(180, 248, 200)"
                }
            },
            {
                id: "n109",
                isPinned: false,
                type: "note-img",
                info: {
                    url: "https://st4.depositphotos.com/1703608/21210/i/950/depositphotos_212102742-stock-photo-portrait-funny-raccoon-showing-sign.jpg",
                    txt: "hey",
                },
                style: {
                    backgroundColor: "rgb(98 98 192)"
                }
            },
            {
                id: "n110",
                isPinned: true,
                type: "note-todos",
                isDone: false,
                info: {
                    txt: "sprint 3",
                    todos: [
                        { txt: "finish", doneAt: Date.now(), id: utilService.makeId() },
                        { txt: "kill self", doneAt: null, id: utilService.makeId() }
                    ]
                },
                style: {
                    backgroundColor: "rgb(75 168 88)"
                }
            },

            {
                id: "n111",
                isPinned: false,
                type: "note-img",
                info: {
                    url: "https://i.picsum.photos/id/306/200/300.jpg?hmac=T-FQeWIc7YbLbcYdpyDGypNif0btJ8n5P4ozBJx8WgE",
                    txt: "🌼",
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
        ]
    }
    gNotes = [...notes];
    _saveNotesToStorage();
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes);
}

function query(pinned, filterBy) {
    if (!pinned) {
        const notes = gNotes.filter(note => !note.isPinned)
        if (!filterBy) return Promise.resolve(notes)
        else if (filterBy.type === 'all') {
            return Promise.resolve(notes.filter(note => note.info.txt.includes(filterBy.word)))
        } else {
            const filteredNotes = notes.filter(note => note.type === filterBy.type &&
                note.info.txt.includes(filterBy.word))
            return Promise.resolve(filteredNotes)
        }
    } else {
        const pinnedNotes = gNotes.filter(note => note.isPinned);
        if (!filterBy) return Promise.resolve(pinnedNotes)
        else if (filterBy.type === 'all') return Promise.resolve(pinnedNotes.filter(note => note.info.txt.includes(filterBy.word)))
        else {
            const filteredpinnedNotes = pinnedNotes.filter(note => {
                return note.type === filterBy.type
            })
            return Promise.resolve(filteredpinnedNotes)
        }
    }
}


// function query(pinnedNotes, filterBy, notes) {
//     if (!pinnedNotes) {
//         if (filterBy) {
//             const { word, type } = filterBy;
//             const filteredNotes = notes.filter(note => {
//                 const subject = note.subject.toLowerCase();
//                 return (subject.includes(word))
//             })






//             const unPinnedNotes = gNotes.filter(note => !note.isPinned)
//             return Promise.resolve(unPinnedNotes)
//         } else {
//             const pinnedNotes = gNotes.filter(note => note.isPinned);
//             return Promise.resolve(pinnedNotes)
//         }
//     }

// function query(filterBy, notes) {
//     if (filterBy) {
//         const { word, type } = filterBy;
//         const filteredNotes = notes.filter(note => {
//             const subject = note.subject.toLowerCase();
//             return (subject.includes(word))
//         })
//         if (type === 'all') return Promise.resolve(filteredNotes)


//         const notesToShow = filteredNotes.filter(note => {
//             if (type === 'read') return note.isRead;
//             if (type === 'unread') return !note.isRead;
//         })
//         return Promise.resolve(notesToShow)
//     }
//     console.log('from service', notes);
//     return Promise.resolve(notes);
// }