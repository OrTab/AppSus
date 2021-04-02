import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/storageService.js'
export const keepService = {
    query,
    addNote,
    deleteNote,
    cloneNote,
    updateNote,
    setTodoMark,
    setNoteStyle
}

window.keep = keepService

var gNotes;
const STORAGE_KEY = 'notesDB'
createNotes()

function createNotes() {
    gNotes = storageService.loadFromStorage(STORAGE_KEY)
    if (!gNotes || !gNotes.length) {
        gNotes = demoNotes()
        storageService.saveToStorage(STORAGE_KEY, gNotes)
    }
}


function query() {
    return Promise.resolve(gNotes)
}


function handleTypeChanged(noteToUpdate, updatedDetails, idx) {
    noteToUpdate.type = updatedDetails.type
    noteToUpdate.info.value = updatedDetails.inputValue
    if (updatedDetails.label) noteToUpdate.info.label = updatedDetails.label
    gNotes.splice(idx, 1, noteToUpdate)
    storageService.saveToStorage(STORAGE_KEY, gNotes)
    return Promise.resolve()
}

function editNoteContext(idx, details) {
    var noteToUpdate = JSON.stringify(gNotes[idx])
    noteToUpdate = JSON.parse(noteToUpdate)

    if (details.inputValue === noteToUpdate.info.value) return Promise.resolve()
    noteToUpdate.updatedAt = Date.now()

    if (details.type !== noteToUpdate.type) {
        return handleTypeChanged(noteToUpdate, details, idx)

    } else {
        noteToUpdate.info.value = details.inputValue
        gNotes.splice(idx, 1, noteToUpdate)
        storageService.saveToStorage(STORAGE_KEY, gNotes)
        return Promise.resolve()
    }
}

function addNote(note) {
    if (note.id) {
        var noteToUpdateIdx = gNotes.findIndex(not => not.id === note.id)
        return editNoteContext(noteToUpdateIdx, note)

    }
    var newNote = {

        id: utilService.makeId(),
        type: note.type,
        isPinned: false,
        createdAt: Date.now(),
        updatedAt: null,
        info: {},
        style: {
            backgroundColor: 'lightblue',
            color: 'red',
            fontSize: 15,
            fontFamily: ''
        }
    }

    return updateInfo(newNote, note)
}


function updateInfo(newNote, note) {

    switch (newNote.type) {
        case 'txt':
            newNote.info = {
                label: note.label,
                value: note.inputValue
            }
            break;
        case 'img':
            newNote.info = {
                label: note.label,
                value: note.inputValue,
            }
            break;

        case 'video':
            newNote.info = {
                label: note.label,
                value: note.inputValue
            }
            break;
        case 'todos':
            newNote.info = {
                label: note.label,
                value: note.inputValue
            }
            break;

    }
    gNotes.unshift(newNote)
    storageService.saveToStorage(STORAGE_KEY, gNotes)
    return Promise.resolve()
}


function deleteNote(noteId) {
    findNoteIdxById(noteId).then(noteIdx => {
        gNotes.splice(noteIdx, 1)
        storageService.saveToStorage(STORAGE_KEY, gNotes)
    })
}


function cloneNote(noteId) {
    findNoteIdxById(noteId).then(noteIdx => {
        let cloneNote = JSON.stringify(gNotes[noteIdx])
        cloneNote = JSON.parse(cloneNote)
        cloneNote.id = utilService.makeId()
        gNotes.splice(noteIdx, 0, cloneNote)
        storageService.saveToStorage(STORAGE_KEY, gNotes)
    })
}

function setNoteStyle(style, note) {
    note.style.fontFamily = style.fontFamily
    note.style.fontSize = style.fontSize
    storageService.saveToStorage(STORAGE_KEY, gNotes)
    return Promise.resolve()
}


function setTodoMark(lineToMark) {
    const { note, idx } = lineToMark
    note.info.value[idx].isDone = !note.info.value[idx].isDone
    note.info.value[idx].doneAt = (note.info.value[idx].isDone) ? Date.now() : null
    storageService.saveToStorage(STORAGE_KEY, gNotes)
    return Promise.resolve()
}

function findNoteIdxById(id) {
    var noteIdx = gNotes.findIndex(note => note.id === id)
    return Promise.resolve(noteIdx)
}

function updateNote(note, action) {
    switch (action) {
        case 'pin':
            note.isPinned = !note.isPinned
            break;
        case 'clone':
            cloneNote(note.id)
            break;
        case 'delete':
            deleteNote(note.id)
            break;
        default:
            note.style.backgroundColor = action
    }
    storageService.saveToStorage(STORAGE_KEY, gNotes)
    return Promise.resolve()
}


function demoNotes() {

    var notes = [{

            id: utilService.makeId(),
            type: 'txt',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: '',
                value: 'Welcome To The Keeper!'
            },
            style: {
                backgroundColor: '#7fdbda',
                color: 'black',
                fontSize: 15,
                fontFamily: ''
            }
        },
        {
            id: utilService.makeId(),
            type: 'img',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: 'Views',
                value: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
            },
            style: {
                backgroundColor: '"#fff48f',
                color: 'black',
                fontSize: 15,
                fontFamily: 'Impact'
            }
        },
        // {


        //     id: utilService.makeId(),
        //     type: 'todos',
        //     isPinned: false,
        //     createdAt: Date.now(),
        //     updatedAt: Date.now(),
        //     info: {
        //         label: 'My Tasks',
        //         todos: [
        //             { txt: 'Hack The Pantagon', isDone: false, doneAt: Date.now() },
        //             { txt: 'Sleep Well', isDone: false, doneAt: null }
        //         ]
        //     },

        //     style: {
        //         backgroundColor: '#00d',
        //         color: 'black',
        //         fontSize: 15,
        //         fontFamily: ''
        //     }
        // },
        {
            id: utilService.makeId(),
            type: 'video',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: 'surf',
                value: 'https://www.youtube.com/embed/oLz5_THzLHc'
            },

            style: {
                backgroundColor: 'whitesmoke',
                color: 'black',
                fontSize: 15,
                fontFamily: ''
            }
        },
        {
            id: utilService.makeId(),
            type: 'img',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: 'Views',
                value: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80',
            },
            style: {
                backgroundColor: '"#fff48f',
                color: 'black',
                fontSize: 15,
                fontFamily: 'Impact'
            }
        },
        {

            id: utilService.makeId(),
            type: 'txt',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: '',
                value: 'So Many Notes'
            },
            style: {
                backgroundColor: '#7fdbda',
                color: 'black',
                fontSize: 15,
                fontFamily: ''
            }
        },
        {
            id: utilService.makeId(),
            type: 'video',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: 'Music',
                value: 'https://www.youtube.com/embed/uHHOIRi2GqE'
            },

            style: {
                backgroundColor: '#f09ae9',
                color: 'black',
                fontSize: 15,
                fontFamily: ''
            }
        }, {
            id: utilService.makeId(),
            type: 'img',
            isPinned: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            info: {
                label: '',
                value: 'https://images1.calcalist.co.il/PicServer3/2017/04/24/720257/1LM.gif',
            },
            style: {
                backgroundColor: '"#fff48f',
                color: 'black',
                fontSize: 15,
                fontFamily: 'Impact'
            }
        },
    ]
    return notes
}