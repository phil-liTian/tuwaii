import { defineComponent } from 'vue';
import { useTable } from '@c/tw-table/index';
import { ReleaseColumns } from './data.config';

export default defineComponent({
	name: 'release',
	setup() {
		const [register, { reload }] = useTable();
		return () => (
			<div>
				<tw-table canAdd onRegister={register} columns={ReleaseColumns} />
			</div>
		);
	}
});
