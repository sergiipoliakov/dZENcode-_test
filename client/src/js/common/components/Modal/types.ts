interface IModalProps {
  show?: boolean
  onHide: () => void
  onCancel: () => void
  onAccept: () => void,
  children: any,
  headerTitle?: string
}

export type {
  IModalProps
}