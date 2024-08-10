import { message } from 'antd';
import { JointContent } from 'antd/es/message/interface';
export function messageInfo(config: JointContent) {
  return message.info(config)
}

export function messageSuccess(config: JointContent) {
  return message.success(config)
}

export function messageWarning(config: JointContent) {
  return message.warning(config)
}

export function messageError(config:JointContent) {
  return message.error(config)
}

export function messageLoading(config: JointContent) {
  return message.loading(config)
}

