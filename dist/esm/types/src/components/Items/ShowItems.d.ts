import { ItemProps } from "./Items";
type ShowItemsProps = {
    ItemPropsArray: ItemProps[];
};
declare const ShowItems: ({ ItemPropsArray }: ShowItemsProps) => JSX.Element;
export default ShowItems;
