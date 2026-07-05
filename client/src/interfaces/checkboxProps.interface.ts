export interface ICheckboxProps {
  label: string;
  selected?: boolean;
  onChange?: (checked: boolean, label: string) => void;
}
