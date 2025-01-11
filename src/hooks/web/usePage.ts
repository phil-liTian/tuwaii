import { useRouter } from 'vue-router';

export function useGo() {
	const { push, replace } = useRouter();
	function go(opt?: any): void;
	function go(opt: any, isReplace: boolean): void;

	function go(opt, isReplace: boolean = false) {
		if (isReplace) {
			replace(opt);
		} else {
			push(opt);
		}
	}

	return { go };
}
