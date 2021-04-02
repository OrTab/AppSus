export function LongTxt ({text, isLongTxtShown}) {
    return <div>
        {isLongTxtShown && <span>{text}</span>}
        {!isLongTxtShown && <span>{text.substring(0, 99)}...</span>}
    </div>
}