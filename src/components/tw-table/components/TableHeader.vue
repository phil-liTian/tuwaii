<template>
	<div :class="prefixCls" :style="{ width: '100%' }">
		<div class="flex flex-items-center">
			<bk-title v-if="title">{{ title }}</bk-title>

			<slot name="headerTopLeft"></slot>

			<div :class="`${prefixCls}__toolbar`">
				<bk-button
					v-if="canExport"
					:class="`${prefixCls}__toolbar-button`"
					shape="round"
					@click="upload"
				>
					<bk-image src="Def_Icon_Export.png" /> 导 出</bk-button
				>

				<Button
					v-if="canAdd"
					v-bind="getAddBtnOpts"
					:class="`${prefixCls}__toolbar-button`"
					@click="add"
				>
					{{ getAddBtnOpts.text }}
				</Button>

				<slot name="toolbar"> </slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { Button, ButtonProps } from 'ant-design-vue';
import { useDesign } from '@h/web/useDesign';
import { propTypes } from '@/utils';
const { prefixCls } = useDesign('basic-table-header');

const props = defineProps({
	title: {
		type: [String, Function] as PropType<string | ((data) => string)>
	},

	canExport: propTypes.bool.def(false),

	canAdd: propTypes.bool.def(false),

	add: propTypes.func,
	upload: propTypes.func,

	addBtnOptions: {
		type: Object as PropType<Recordable>,
		default: () => ({})
	}
});

const getAddBtnOpts = computed(() => {
	return {
		text: '添 加',
		shape: 'round',
		type: 'primary',
		...props.addBtnOptions
	} as ButtonProps & { text: string };
});

const emits = defineEmits(['add']);
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-basic-table-header';

.@{prefix-cls} {
	&__toolbar {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: flex-end;

		> .bk-button {
			display: flex;
			align-items: center;
			&:not(:last-child) {
				margin-right: 10px;
			}
		}

		&-button {
			.bk-image {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
		}
	}
}
</style>
