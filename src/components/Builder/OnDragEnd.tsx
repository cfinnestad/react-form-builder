import {AnyItem, GroupItem} from "../Items/Items";
import {v4 as uuid} from "uuid";
import {Options} from "./Builder";
import {Active, DragEndEvent} from "@dnd-kit/core";
import findDragItem, {DragItem} from "../Items/findDragItem";

const onDragEnd = (result: DragEndEvent, items: AnyItem[], options: Options):void => {
	const { active, over } = result;

	const reorder = (source: DragItem | undefined, destination: DragItem | undefined):AnyItem[] => {
		// console.log('source', source)
		// console.log('destination', destination)
		if(source === undefined || destination === undefined) {
			return items
		}

		const newList = [...source.items || []]
		newList[destination.index] = newList.splice(source.index, 1, newList[destination.index])[0]

		return updateItems(items, source.groupId, newList);
	};
	const move = (source: DragItem | undefined, destination: DragItem | undefined):AnyItem[] => {
		if(source === undefined || destination === undefined) {
			return items
		}

		const sourceClone = [...source.items];
		const destClone = [...destination?.items];

		const [removed] = sourceClone.splice(source.index, 1);

		//todo may want to make sure name is unique in the destination list

		destClone.splice(destination.index, 0, removed);

		let newItems =updateItems(updateItems(items, source.groupId, sourceClone), destination.groupId, destClone)
		console.log(newItems)
		return newItems
	};
	const copy = (active: Active, destination: DragItem | undefined) => {
		console.log('==> dest', destination);

		if(destination === undefined) {
			return items
		}

		const destClone = [...destination.items || []];
		const overIndex = destination.index;
		const item = {...options.AllowedItems[active.id].Item};

		//todo may want to make sure name is unique in the destination list

		destClone.splice(overIndex, 0, { ...item, id: uuid() });
		return updateItems(items, destination.groupId, destClone)
	};

	const updateItems = (list: AnyItem[], containerId: string|number, listPart: AnyItem[]): AnyItem[] => {
		if (containerId === 'Main') {
			return listPart
		}
		return list.map(item => {
			if (item.id === containerId) {
				(item as GroupItem).items = listPart
			} else if(item.type === 'Group') {
				(item as GroupItem).items = updateItems((item as GroupItem).items, containerId, listPart)
			}
			return item
		})
	}

	if (!over) {
		return;
	}

	const source = active.data.current?.sortable
	const destination = over.data.current?.sortable

	if(destination.containerId === 'Types') {
		return
	}

	console.log('switch')
	switch (source.containerId) {
		case 'Types':
			console.log('types')
			options.setItems(
				copy(
					active,
					findDragItem(over.id, items, destination.containerId)
				)
			);
			break;
		case destination.containerId:
			console.log('reorder')
			if (source.index === destination.index) {
				return
			}
			options.setItems(reorder(
					findDragItem(active.id, items, source.containerId),
					findDragItem(over.id, items, destination.containerId)
				)
			);
			break;
		default:
			console.log('default')
			options.setItems(
				move(
					findDragItem(active.id, items, source.containerId),
					findDragItem(over.id, items, destination.containerId)
				)
			);
			break;
	}
}

export default onDragEnd