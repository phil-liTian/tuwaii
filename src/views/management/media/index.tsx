import { defineComponent } from 'vue';
import { MediaColumns } from './data.config';

export default defineComponent({
	setup() {
		const handleAdd = () => {
			console.log('add');
		};
		return () => {
			return (
				<tw-table
					canAdd
					columns={MediaColumns}
					dataSource={[{}]}
					onAdd={handleAdd}
				/>
			);
		};
	}
});
