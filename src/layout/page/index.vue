<template>
	<router-view>
		<template #default="{ Component, route }">
			<transition :name="getTransitionName()" mode="out-in" appear>
				<component :is="Component" :key="route.fullPath"></component>
			</transition>
		</template>
	</router-view>
</template>

<script lang="ts" setup>
import { getTransitionName } from './transition';
</script>

<style lang="less" scoped></style>
