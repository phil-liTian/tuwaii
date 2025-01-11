import { ref } from 'vue';

export function useLoading() {
	const loadingRef = ref(false);
	function setLoading(loading: boolean) {
		loadingRef.value = loading;
	}

	return {
		loadingRef,
		setLoading
	};
}
