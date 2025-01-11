<template>
	<div :class="[prefixCls, 'flex']">
		<div :class="`${prefixCls}-edit`" @click="emits('edit')">
			{{ editText }}
		</div>
		<slot></slot>
		<div v-if="showDelFlag" :class="`${prefixCls}-del`" @click="emits('del')">
			删 除
		</div>
	</div>
</template>

<script lang="ts" setup>
import { propTypes } from '@/utils';
import { useDesign } from '@h/web/useDesign';
const { prefixCls } = useDesign('table-action');
defineProps({
	showDelFlag: propTypes.bool.def(true),
	editText: propTypes.string.def('编 辑')
});
const emits = defineEmits(['edit', 'del']);
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-table-action';

.@{prefix-cls} {
	> div {
		cursor: pointer;
	}
	&-edit {
		margin-right: 20px;
		color: #1e86ff;
	}
	&-del {
		color: @fail-color;
	}
}
</style>
