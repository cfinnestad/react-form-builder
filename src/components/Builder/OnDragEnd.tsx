import {AnyItem, GroupItem, isGroup, isNamed} from "../Items";
import {v4} from "uuid";
import {Active, DragEndEvent} from "@dnd-kit/core";
import findDragItem, {DragItem} from "../Items/findDragItem";
import {Dispatch, SetStateAction} from "react";
import {cloneDeep} from "lodash";
import {BuilderOptions, MAIN, TYPES} from "./Builder";

export const updateItems = (list: AnyItem[], containerId: string|number, listPart: AnyItem[]): AnyItem[] => {
	if (containerId === MAIN) {
		return listPart
	}
	return list.map(item => {
		if (item.id === containerId) {
			(item as GroupItem).items = listPart
		} else if(isGroup(item)) {
			(item as GroupItem).items = updateItems(item.items, containerId, listPart)
		}
		return item
	})
}

export const fixItemName = (item: AnyItem, overRef: DragItem): AnyItem => {
	if (isNamed(item)) {
		let cnt = 1
		const name = item.name
		while (overRef.items.filter(i => isNamed(i) && i.name === item.name).length > 0) {
			item.name = name + '_' + (cnt++).toString()
		}
		item.id = (overRef.groupId === MAIN ? '' : overRef.groupId + '-') + item.name
	} else {
		item.id = v4()
	}
	return item as AnyItem
}

const onDragEnd = (result: DragEndEvent, items: AnyItem[], options: BuilderOptions, setActiveItem: Dispatch<SetStateAction<AnyItem|undefined>>):void => {
	const { active, over } = result;
	console.log('Active', active)
	console.log('Over', over)

	setActiveItem(undefined)

	const reorder = (source: DragItem | undefined, destination: DragItem | undefined):AnyItem[] => {
		console.log('source', source)
		console.log('destination', destination)
		if(source === undefined || destination === undefined) {
			return items
		}

		const newList = [...(source.items || [])]
		newList[destination.index] = newList.splice(source.index, 1, newList[destination.index])[0]

		return updateItems(items, source.groupId, newList);
	};
	const move = (source: DragItem | undefined, destination: DragItem | undefined):AnyItem[] => {
		if(source === undefined || destination === undefined) {
			return items
		}

		const item = fixItemName(source.item, destination);

		let newItems = updateItems(
			updateItems(items, source.groupId, source.items.splice(source.index,1)),
			destination.groupId,
			[
				...destination.items.slice(0,destination.index),
				item,
				...destination.items.slice(destination.index, destination.items.length)
			]
		)
		console.log(newItems)
		return newItems
	};
	const copy = (active: Active, destination: DragItem | undefined) => {
		console.log('==> dest', destination);

		if(destination === undefined || active.data.current?.hasOwnProperty('Items') === false || typeof active.data.current?.Items !== 'object') {
			return items
		}
		const newItems = (active.data.current.Items as AnyItem[]).map(itm => fixItemName(cloneDeep(itm), destination))

		// destClone.splice(overIndex, 0, ...newItems);
		return updateItems(items, destination.groupId, [
			...destination.items.slice(0,destination.index),
			...newItems,
			...destination.items.slice(destination.index,destination.items.length)
		])
	};

	if (!over) {
		return;
	}

	const destination = findDragItem(over.id, items, MAIN)
	const source = active.data.current?.sortable?.containerId === TYPES
		? {groupId: TYPES, index: 0, items: active.data.current.Items, item: active.data.current.Items[0]} as DragItem
		: findDragItem(active.id, items, MAIN)

	if(!source || !destination) return

	console.log('switch')
	console.log('source container', source)
	console.log('destination container', destination)
	switch (source.groupId) {
		case TYPES:
			console.log('types')
			options.setItems(
				copy(
					active,
					findDragItem(over.id, destination.items, destination.groupId)
				)
			);
			break;
		case destination.groupId:
			console.log('reorder')
			if (source.index === destination.index) {
				return
			}
			options.setItems(reorder(
					findDragItem(active.id, source.items, source.groupId),
					findDragItem(over.id, destination.items, destination.groupId)
				)
			);
			break;
		default:
			console.log('default')
			options.setItems(
				move(
					findDragItem(active.id, source.items, source.groupId),
					findDragItem(over.id, destination.items, destination.groupId)
				)
			);
			break;
	}
}

export default onDragEnd