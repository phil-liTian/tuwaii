import { defineComponent } from 'vue';
import { ContentColumns } from './data.config';

export default defineComponent({
	setup() {
		return () => (
			<div>
				<tw-table canAdd columns={ContentColumns} />
			</div>
		);
	}
});
