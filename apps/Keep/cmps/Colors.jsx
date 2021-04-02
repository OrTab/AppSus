export function Colors({onEditColor}) {

    return (
        <div className="edit-colors">
            <span  onClick={(ev) => onEditColor('#fcf7bb', ev)} style={{ backgroundColor: "#fff48f" }}></span>
            <span  onClick={(ev) => onEditColor('#f2a6a6', ev)} style={{ backgroundColor: "#e8505b" }}></span>
            <span  onClick={(ev) => onEditColor('#d4ebd0', ev)} style={{ backgroundColor: "#ade498" }}></span>
            <span  onClick={(ev) => onEditColor('#d6e5fa', ev)} style={{ backgroundColor: "#01a9b4" }}></span>
            <span onClick={(ev) => onEditColor('#ffd5e5', ev)} style={{ backgroundColor: "#df5e88" }}></span>
            <span onClick={(ev) => onEditColor('#d3f6f3', ev)} style={{ backgroundColor: "#7fdbda" }}></span>
            <span onClick={(ev) => onEditColor('#e1ccec', ev)} style={{ backgroundColor: "#f09ae9" }}></span>
            <span  onClick={(ev) => onEditColor('#ececec', ev)} style={{ backgroundColor: "#e4e4e4" }}></span>
            <span  onClick={(ev) => onEditColor('white', ev)}style={{ backgroundColor: "white"}}></span>
            <span  onClick={(ev) => onEditColor('rgb(241, 251, 255)', ev)}style={{ backgroundColor: "rgb(241, 251, 255)"}}></span>
        </div>
    )

}