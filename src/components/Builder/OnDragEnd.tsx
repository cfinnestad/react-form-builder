import {AnyItem, GroupItem} from "../Items/Items";
import {v4 as uuid} from "uuid";
import {Options} from "./Builder";
import {Active, DragEndEvent, Over, UniqueIdentifier} from "@dnd-kit/core";

type ListType = {
	ids: (string|number)[]
	list?: AnyItem[]
}

// const onDragEnd = (result: DragEndEvent, items: AnyItem[], options: Options):void => {
// }
const onDragEnd = (result: DragEndEvent, items: AnyItem[], options: Options):void => {
	const { active, over } = result;
	console.log('active', active)
	console.log('over', active)
	const reorder = (list: AnyItem[], active: Active, over: Over):AnyItem[] => {
		const result: AnyItem[] = [...list];

		const activeIndex = list.findIndex(({ id }) => id === active.id);
		const overIndex = list.findIndex(({ id }) => id === over.id);
		const [removed] = result.splice(activeIndex, 1);
		result.splice(overIndex, 0, removed);

		return result;
	};
	const move = (active: Active, over: Over):AnyItem[] => {

		const source = getList(active.id, items)
		const destination = getList(over.id, items)
		const sourceClone = [...source.list || []];
		const destClone = [...destination.list || []];

		const activeIndex = sourceClone.findIndex(({ id }) => id === active.id);
		const overIndex = destClone.findIndex(({ id }) => id === over.id);
		const [removed] = sourceClone.splice(activeIndex, 1);

		destClone.splice(overIndex, 0, removed);

		let newItems = updateItems(items, source.ids, sourceClone)
		return updateItems(newItems, destination.ids, destClone)
	};
	const copy = (destination: ListType, over: Over, type: UniqueIdentifier) => {
		console.log('==> dest', destination);

		const destClone = [...destination.list || []];
		const overIndex = destClone.findIndex(({ id }) => id === over.id);
		const item = {...options.AllowedItems[type].Item};
		item.id = uuid()

		//todo may want to make sure name is unique in the destination list

		destClone.splice(overIndex, 0, { ...item, id: uuid() });
		return updateItems(items, destination.ids, destClone)
	};

	const updateItems = (list: AnyItem[], ids: (string|number)[], listPart: AnyItem[]): AnyItem[] => {
		const id = ids.pop()
		if (id === undefined) {
			return listPart
		}
		return list.map(AnyItem => {
			if (AnyItem.id === id) {
				(AnyItem as GroupItem).items = updateItems((AnyItem as GroupItem).items, ids, listPart)
			}
			return AnyItem
		})
	}
	const getList = (id: string|number, curList: AnyItem[]): ListType => {
		const list: ListType = {
			ids: [],
		}
		if (id === 'mainItems') {
			list.list = curList
		}
		let found = false
		curList.forEach((Item) => {
			if (!found) {
				if (Item.id === id) {
					list.ids.push(id)
					list.list = (Item as GroupItem).items
					found = true
				} else if (Item.type === "Group") {
					let nextList = getList(id, (Item as GroupItem).items)
					if (nextList.list !== undefined) {
						list.ids.push(id)
						list.list = nextList.list
						found = true
					}
				}
			}
		})
		return list
	}
	if (!over) {
		return;
	}

	switch (active?.data?.current?.sortable?.id) {
		case over?.data?.current?.sortable.id:
			return
		// 			if (source.index === destination.index) {
// 				return
// 			}
// 			options.SetItems(reorder(
// 					items,
// 					source.index,
// 					destination.index
// 				)
// 			);
// 			break;
		case 'Types':
			options.SetItems(
				copy(
					getList(over.id, items),
					over,
					over.id
				)
			);
			break;
		default:
			options.SetItems(
				move(
					active,
					over
				)
			);
			break;
	}
}

export default onDragEnd