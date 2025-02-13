import {AnyItem, GroupItem, isGroup, isList, isNamed} from "../Items";
import {v4} from "uuid";
import {Active, DragEndEvent} from "@dnd-kit/core";
import findDragItem, {DragItem} from "../Items/findDragItem";
import {BuilderOptions, MAIN, TYPES} from "./Builder";

export const updateItems = (list: AnyItem[], containerId: string|number, listPart: AnyItem[]): AnyItem[] => {
	// console.log('containerId',containerId);
	if (containerId === MAIN) {
		return listPart
	}
	return list.map(item => {
		// console.log('Update Item', item);
		if (isGroup(item)) {

			if( item.id === containerId) {
				(item as GroupItem).items = listPart
			} else {
				item.items = updateItems(item.items, containerId, listPart)
			}
		} else if(isList(item)&&isGroup(item.baseItem)) {
			if( item.baseItem.id === containerId ) {
				item.baseItem.items = listPart
			} else {
				item.baseItem.items = updateItems(item.baseItem.items, containerId, listPart)
			}
		}
		// console.log('Updated Item', item);
		return item
	})
}

const fixGroupsIds = (groupItem: GroupItem) => {
	groupItem.items.map(item => {
		if (isNamed(item)) {
			item.id = groupItem.id + '-' + item.name
			if (isGroup(item)) {
				fixGroupsIds(item)
			}
		}
	})
}

export const fixItemName = (item: AnyItem, overRef: DragItem): AnyItem => {
	if (isNamed(item)) {
		let cnt = 1
		const name = item.name
		while (overRef.items.filter(i => {
			let found = false;
			if (isNamed(i)) {
				found =  i.name === item.name
			} else if(isList(i)) {
				found = i.baseItem.name === item.name
			}
			return found
		}).length > 0) {
			item.name = name + '_' + (cnt++).toString()
		}
		item.id = (overRef.groupId === MAIN ? '' : overRef.groupId + '-') + item.name
		if(isGroup(item)) {
			fixGroupsIds(item)
		}
	} else {
		item.id = v4()
	}
	return item as AnyItem
}

const onDragEnd = (result: DragEndEvent, items: AnyItem[], options: BuilderOptions):void => {
	const { active, over } = result;
	// console.log('DragEnd Active', active)
	// console.log('DragEnd Over', over)


	const reorder = (source: DragItem | undefined, destination: DragItem | undefined):AnyItem[] => {
		// console.warn('Reorder')
		// console.log('source', source)
		// console.log('destination', destination)
		if(source === undefined || destination === undefined) {
			return items
		}

		const newList = source.items.filter(i => i.id !== active.id)
		// console.log('Reorder Return')
		return updateItems(items, source.groupId, [
			...newList.slice(0,destination.index),
			source.item,
			...newList.slice(destination.index,newList.length)
		]);
	};

	const copy = (active: Active, destination: DragItem | undefined) => {
		// console.log('==> dest', destination);

		if(destination === undefined || active.data.current?.hasOwnProperty('Items') === false || typeof active.data.current?.Items !== 'object') {
			return items
		}
		const newItems = (active.data.current.Items as AnyItem[]).map(itm => fixItemName(itemCloneDeep(itm), destination))

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

	// console.log('switch')
	// console.log('source container', source)
	// console.log('destination container', destination)
	switch (source.groupId) {
		case TYPES:
			// console.log('types')
			options.setItems(
				copy(
					active,
					findDragItem(over.id, destination.items, destination.groupId)
				)
			);
			break;
		case destination.groupId:
			// console.log('reorder')
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
			// console.log('default')
			// options.setItems(
			// 	move(
			// 		findDragItem(active.id, source.items, source.groupId),
			// 		findDragItem(over.id, destination.items, destination.groupId)
			// 	)
			// );
			break;
	}
}

export default onDragEnd