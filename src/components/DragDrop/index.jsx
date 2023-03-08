import { Image } from "components/Image"
import { useEffect, useState } from "react"
import { useDrop } from "react-dnd"


export const DragDrop = () => {
    const [imageSets, setImagesSets] = useState([])
    const [images, setImages] = useState([])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: ({ id }) => addImageToSet(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }), [images])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/images");
            const images = await res.json()
            setImages(images)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/draggedImages");
            const images = await res.json()
            setImagesSets(images)
        }
        fetchData()
    }, [])

    const addImageToSet = async (id) => {
        const image = images?.find((image) => image?.id === id)
        const filteredImages = images?.filter((image) => image?.id !== id)
        setImages(filteredImages)
        setImagesSets((prev) => [...prev, image])
        await fetch(`http://localhost:3000/draggedImages`, {
            method: "POST",
            body: JSON.stringify(image)
        });
        await fetch(`http://localhost:3000/images/${image?.id}`, { method: "DELETE" });
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/images");
            const images = await res.json()
            setImages(images)
        }
        fetchData()
    }

    return (
        <div style={{ width: "100%", padding: 0, position: "relative" }} ref={drop}>
            <div style={{ display: "flex", gap: ".5rem", justifyContent: "center", flexWrap: "wrap", minWidth: "800px", margin: "0 auto" }}>
                {images?.map(({ uri, id }) => <Image key={id} uri={uri} id={id} />)}
            </div>
            <div style={style} ref={drop} >
                {imageSets?.map((item, index) => <Image key={item?.id} uri={item?.uri} id={item?.id} />)}
            </div>
        </div>
    )
}

const style = {
    padding: "2rem",
    border: "1px solid #c1c1c1",
    width: "700px",
    minHeight: "200px",
    margin: "8rem auto",
    display: "grid",
    justifyContent: "center",
    placeItems: "center",
    gridTemplateColumns: "repeat(3,1fr)",
}