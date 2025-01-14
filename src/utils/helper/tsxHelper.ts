import { Slots } from 'vue';
import { isFunction } from '../is';

export function getSlot(slots: Slots, slot = 'default', data?: any) {
	if (!slots || !Reflect.has(slots, slot)) {
		return null;
	}

	if (!isFunction(slots[slot])) {
		return null;
	}

	const slotFn = slots[slot];
	if (!slotFn) {
		return null;
	}

	const params = { ...data };
	return slotFn(params);
}
