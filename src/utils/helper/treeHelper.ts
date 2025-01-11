export function treeMap<T = any>(
	treeData: T[],
	opt: { children?: string; conversion: Function }
): T[] {
	return treeData.map((item) => treeMapEach(item, opt));
}

export function treeMapEach(
	data: any,
	{
		children = 'children',
		conversion
	}: { children?: string; conversion: Function }
) {
	const haveChildren =
		Array.isArray(data[children]) &&
		data[children].length > 0 &&
		!data.meta.hideChild;
	const conversionData = conversion(data) || {};
	if (haveChildren) {
		return {
			...conversionData,
			[children]: data[children].map((i: number) =>
				treeMapEach(i, {
					children,
					conversion
				})
			)
		};
	} else {
		return {
			...conversionData
		};
	}
}
