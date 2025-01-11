import {
	message as Message,
	Modal,
	ModalFuncProps,
	notification,
	Button
} from 'ant-design-vue';
import { isString } from '@u/is';
import {
	InfoCircleFilled,
	CheckCircleFilled,
	CloseCircleFilled
} from '@ant-design/icons-vue';
import { h } from 'vue';
import { noop } from '@vueuse/core';
import {
	ConfigProps,
	NotificationArgsProps
} from 'ant-design-vue/es/notification';

export interface NotifyApi {
	info(config: NotificationArgsProps): void;
	success(config: NotificationArgsProps): void;
	error(config: NotificationArgsProps): void;
	warn(config: NotificationArgsProps): void;
	warning(config: NotificationArgsProps): void;
	open(args: NotificationArgsProps): void;
	close(key: String): void;
	config(options: ConfigProps): void;
	destroy(): void;
}

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
	iconType: 'warning' | 'success' | 'error' | 'info';
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> &
	Pick<ModalOptionsEx, 'content'>;

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
	if (isString(content)) {
		return (
			<div
				innerHTML={`<div class='bk-modal-wrapper-content'>${content as string}</div>`}
			></div>
		);
	} else {
		return content;
	}
}

// TODO : 样式根据页面场景调整
const getBaseOptions = (
	{ onOk, onCancel } = { onOk: noop, onCancel: noop }
) => {
	return {
		centered: true,
		footer: h('div', {}, [
			h(
				Button,
				{ class: 'absolute right-26 bottom-8', onOnClick: onCancel },
				() => '取消'
			),
			h(
				Button,
				{
					type: 'primary',
					class: 'absolute right-8 bottom-8',
					onOnClick: onOk
				},
				() => '确定'
			)
		])
	};
};

function getIcon(iconType: string) {
	if (iconType === 'warning') {
		return <InfoCircleFilled class="modal-icon-warning" />;
	} else if (iconType === 'success') {
		return <CheckCircleFilled class="modal-icon-success" />;
	} else if (iconType === 'info') {
		return <InfoCircleFilled class="modal-icon-info" />;
	} else {
		return <CloseCircleFilled class="modal-icon-error" />;
	}
}
function createModalOptions(
	options: ModalOptionsPartial,
	icon: string
): ModalOptionsPartial {
	return {
		...getBaseOptions(),
		...options,
		content: renderContent(options),
		icon: getIcon(icon)
	};
}

function createSuccessModal(options: ModalOptionsPartial) {
	return Modal.success(createModalOptions(options, 'success'));
}

function createErrorModal(options: ModalOptionsPartial) {
	return Modal.error(createModalOptions(options, 'error'));
}

function createInfoModal(options: ModalOptionsPartial) {
	return Modal.info(createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
	return Modal.warning(createModalOptions(options, 'warning'));
}

function createConfirmModal(options: ModalOptionsPartial) {
	const opts: ModalFuncProps = {
		// @ts-ignore
		...getBaseOptions(options),
		centered: true,
		title: '温馨提示',
		cancelText: '取消',
		okText: '确定',
		bodyStyle: { height: '100px' },
		content: renderContent(options),
		...options
	};

	return Modal.confirm(opts);
}

notification.config({
	placement: 'topRight',
	duration: 3
});

export function useMessage() {
	return {
		createMessage: Message,
		notification: notification as NotifyApi,
		createConfirmModal,
		createSuccessModal,
		createErrorModal,
		createInfoModal,
		createWarningModal
	};
}
