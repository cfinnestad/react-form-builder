import React, {useState} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Actions from "../Actions/Actions";

const Builder = ({ Items, Options}: BuilderOptions) => {
    const [items, setItems] = useState(Items)
    return <div className='builder'>
    <Actions Items={items} SetItems={setItems()} Options={Options}/>

    </div>
}

export default Builder