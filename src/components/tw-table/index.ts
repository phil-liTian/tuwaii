import { withInstall } from '@u/index';
import BasicTable from './src/BasicTable.vue';
export * from './types/table';
export * from './hooks/useTable';
export const BkTable = withInstall(BasicTable);

export default BkTable;
