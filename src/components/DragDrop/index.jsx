import { Image } from "components/Image"
import { images } from "constants/index"
import { useState } from "react"
import { useDrop } from "react-dnd"


export const DragDrop = () => {
    const [imageSets, setImagesSets] = useState([1, 2, 3, 4, 5, 6])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: ({ id }) => addImageToSet(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), [])

    // console.log(isOver, "IS over");
    const addImageToSet = (id) => {
        const image = images.find((image) => image?.id === id)
        setImagesSets((prev) => {
            const latest = prev.slice(0, 5);
            return [image, ...latest]
        })
    }

    return (
        <div style={{ width: "100%", padding: 0, position: "relative" }}>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", minWidth: "800px", margin: "0 auto" }}>
                {images?.map(({ uri, id }) => <Image key={id} uri={uri} id={id} />)}
            </div>
            <div style={style} ref={drop} >
                {imageSets?.map(({ uri = "", id = Math.floor(Math.random() * 25) + Math.random() }) => <div style={style2} key={id}>{!!uri && <Image uri={uri} id={id} />}</div>)}
                {isOver && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '200px',
                            width: '200px',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                        }}
                    />
                )}
            </div>
        </div>
    )
}

const style = {
    padding: "2rem",
    border: "1px solid #c1c1c1",
    width: "700px",
    minHeight: "400px",
    margin: "8rem auto",
    display: "grid",
    justifyContent: "center",
    placeItems: "center",
    gridTemplateColumns: "repeat(3,1fr)",
    gridTemplateRows: "repeat(2,1fr)",
}

const style2 = {
    margin: 0,
    padding: 0,
    border: "1px solid green",
    width: "200px",
    height: "200px"
}