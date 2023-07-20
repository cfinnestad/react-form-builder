import React from "react";
import { ItemProps } from "./Items";
type EditModalProps = ItemProps & {
    showModal: boolean;
};
declare const EditModal: (itemProps: EditModalProps) => React.JSX.Element;
export default EditModal;
