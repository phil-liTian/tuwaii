const prefixCls = 'tw';
export function useDesign(scope?: string) {
	return {
		prefixCls: `${prefixCls}-${scope}`,
		prefixVar: prefixCls
	};
}
