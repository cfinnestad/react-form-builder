import {DraggableLocation, DropResult} from "react-beautiful-dnd";
import {AnyItem, GroupItem} from "../Items/Items";
import {v4 as uuid} from "uuid";
import {Options} from "./Builder";

type ListType = {
	id: string[]
	list?: AnyItem[]
}

const onDragEnd = (result: DropResult, items: AnyItem[], options: Options):void => {
	const { source, destination, draggableId } = result;



	const reorder = (list: AnyItem[], startIndex: number, endIndex: number):AnyItem[] => {
		const result: AnyItem[] = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};
	const move = (source: ListType, destination: ListType, droppableSource:DraggableLocation, droppableDestination:DraggableLocation):AnyItem[] => {
		const sourceClone = [...source.list || []];
		const destClone = [...destination.list || []];
		const [removed] = sourceClone.splice(droppableSource.index, 1);

		destClone.splice(droppableDestination.index, 0, removed);

		let newItems = updateItems(items, source.id, sourceClone)
		return updateItems(newItems, destination.id, destClone)
	};
	const copy = (destination: ListType, droppableDestination:DraggableLocation, type:string) => {
		console.log('==> dest', destination);

		const destClone = [...destination.list || []];
		const item = {...options.AllowedItems[type].Item};
		item.id = uuid()

		destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
		return updateItems(items, destination.id, destClone)
	};

	const updateItems = (list: AnyItem[], ids: string[], listPart: AnyItem[]): AnyItem[] => {
		const id = ids.pop()
		if (id === undefined) {
			return listPart
		}
		return list.map(AnyItem => {
			if (AnyItem.id === id) {
				(AnyItem as GroupItem).Items = updateItems((AnyItem as GroupItem).Items, ids, listPart)
			}
			return AnyItem
		})
	}
	const getList = (id: string, curList: AnyItem[]): ListType => {
		const list: ListType = {
			id: [],
		}
		if (id === 'mainItems') {
			list.list = curList
		}
		let found = false
		curList.forEach((Item) => {
			if (!found) {
				if (Item.id === id) {
					list.id.push(id)
					list.list = (Item as GroupItem).Items
					found = true
				} else if (Item.type === "Group") {
					let nextList = getList(id, (Item as GroupItem).Items)
					if (nextList.list !== undefined) {
						list.id.push(id)
						list.list = nextList.list
						found = true
					}
				}
			}
		})
		return list
	}
	if (!destination) {
		return;
	}

	switch (source.droppableId) {
		case destination.droppableId:
			if (source.index === destination.index) {
				return
			}
			options.SetItems(reorder(
					items,
					source.index,
					destination.index
				)
			);
			break;
		case 'Types':
			options.SetItems(
				copy(
					getList(destination.droppableId, items),
					destination,
					draggableId
				)
			);
			break;
		default:
			options.SetItems(
				move(
					getList(source.droppableId, items),
					getList(destination.droppableId, items),
					source,
					destination
				)
			);
			break;
	}
}

export default onDragEnd