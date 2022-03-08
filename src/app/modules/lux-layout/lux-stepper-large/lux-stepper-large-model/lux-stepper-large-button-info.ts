export const LUX_STEPPER_LARGE_DEFAULT_PREV_BTN_CONF: LuxStepperLargeButtonInfo = {
  label: $localize`:@@luxc.stepper.back.btn:Zurück`,
  color: null,
  iconName: 'fas fa-arrow-left',
  iconShowRight: false
};

export const LUX_STEPPER_LARGE_DEFAULT_NEXT_BTN_CONF: LuxStepperLargeButtonInfo = {
  label: $localize`:@@luxc.stepper.next.btn:Weiter`,
  color: 'primary',
  iconName: 'fas fa-arrow-right',
  iconShowRight: true
};

export const LUX_STEPPER_LARGE_DEFAULT_FIN_BTN_CONF: LuxStepperLargeButtonInfo = {
  label: $localize`:@@luxc.stepper.finish.btn:Abschließen`,
  color: 'primary',
  iconName: undefined,
  iconShowRight: false
};

export class LuxStepperLargeButtonInfo {
  label?: string;
  color?: 'primary' | 'accent' | 'warn' | '';
  iconName?: string;
  iconShowRight?: boolean;
  alignIconWithLabel?: boolean;
}