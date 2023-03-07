import { Image } from "components/Image"
import { images } from "constants/index"
import { useState } from "react"
import { useDrop } from "react-dnd"


export const DragDrop = () => {
    const [imageSets, setImagesSets] = useState([])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: ({ id }) => addImageToSet(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addImageToSet = (id) => {
        const image = images.find((image) => image?.id === id)
        setImagesSets((prev) => [...prev, image])
    }

    return (
        <div>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", maxWidth: "800px",margin:"0 auto" }}>
                {images?.map(({ uri, id }) => <Image key={id} uri={uri} id={id} />)}
            </div>
            <div style={style} ref={drop}>
                {imageSets?.map(({ uri, id }) => <Image uri={uri} id={id} key={id} />)}
            </div>
        </div>
    )
}

const style = {
    border: "1px solid #c1c1c1",
    width: "700px",
    margin: "8rem auto",
    height: "300px",
    display: "grid",
    justifyContent: "center",
    placeItems: "center",
    gap: ".5rem",
    gridTemplateColumns: "repeat(3,1fr)"
}