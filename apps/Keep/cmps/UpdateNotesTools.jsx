export function CreateTools({onImgInput,handleChange,setNoteType,onAddNote,currNote,showFileInput,placeholder}) {

    return (
        <section>
            <div className="notes-input">
                <input type="text" placeholder="Label your note.." onChange={()=>handleChange()} name="label" value={currNote.label} />
                <textarea name="inputValue" cols="30" rows="2" value={currNote.inputValue} placeholder={placeholder} onChange={()=>handleChange()}></textarea>
                {showFileInput && <input className="file-input" type="file" name="image" onChange={()=>onImgInput()} />}
                {/* <label><i className='fas fa-palette'>{this.state.showColors&&<input type="color"/>}</i></label> */}
            </div>
            <div className="icons">
                <i className="fa fa-font" onClick={() => setNoteType('txt')}></i>
                <i className="fa fa-image" onClick={() => setNoteType('img')}></i>
                <i className="fa fa-youtube" onClick={() => setNoteType('video')}></i>
                <i className="fa fa-list-ul" onClick={() => setNoteType('todos')}></i>
                <i className="fa fa-plus" onClick={() => onAddNote()}></i>
            </div>
        </section>
    )

}