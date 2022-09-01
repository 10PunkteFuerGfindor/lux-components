import { UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { OnInit, Directive } from '@angular/core';
import {
  LuxBehandlungsOptionenUngueltige,
  LuxFieldValues,
  LuxLookupParameters
} from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-parameters';
import { LuxLookupService } from '../../../modules/lux-lookup/lux-lookup-service/lux-lookup.service';
import { LuxLookupHandlerService } from '../../../modules/lux-lookup/lux-lookup-service/lux-lookup-handler.service';
import { LuxLookupTableEntry } from '../../../modules/lux-lookup/lux-lookup-model/lux-lookup-table-entry';
import {
  emptyErrorCallback,
  exampleErrorCallback,
  logResult,
  setRequiredValidatorForFormControl
} from '../../example-base/example-base-util/example-base-helper';

@Directive()
export abstract class LookupExampleComponent implements OnInit {
  options = [
    { label: LuxBehandlungsOptionenUngueltige.ausgrauen, value: 0 },
    { label: LuxBehandlungsOptionenUngueltige.anzeigen, value: 1 },
    { label: LuxBehandlungsOptionenUngueltige.ausblenden, value: 2 }
  ];
  validatorOptions = [
    { value: Validators.minLength(3), label: 'Validators.minLength(3)' },
    { value: Validators.maxLength(10), label: 'Validators.maxLength(10)' },
    { value: Validators.email, label: 'Validators.email' }
  ];
  useErrorMessage = true;
  showOutputEvents = false;
  useRenderFn = false;
  log = logResult;
  form: UntypedFormGroup;
  renderFnString = this.renderFn + '';
  renderProp = 'kurzText';
  parameters?: LuxLookupParameters;
  selected: any;
  customStyle: {} | null = null;
  customInvalidStyle: {} | null = null;
  behandlungUngueltige: LuxBehandlungsOptionenUngueltige = LuxBehandlungsOptionenUngueltige.ausgrauen;
  disabled = false;
  controlBinding = 'lookup';
  readonly = false;
  required = false;
  tableNo = '1002';
  label = 'Label';
  hint = 'Hint';
  hintShowOnlyOnFocus = false;
  placeholder = 'Placeholder';
  controlValidators: ValidatorFn[] = [];
  errorMessage = 'Das Feld enthält keinen gültigen Wert';
  value: LuxLookupTableEntry | LuxLookupTableEntry[] | null = null;
  errorCallback = exampleErrorCallback;
  emptyCallback = emptyErrorCallback;
  errorCallbackString = this.errorCallback + '';

  protected constructor(
    protected lookupHandler: LuxLookupHandlerService,
    protected fb: UntypedFormBuilder
  ) {
    this.form = this.fb.group({
      lookup: ['']
    });
  }

  ngOnInit() {
    this.parameters = new LuxLookupParameters({
      knr: 101,
      fields: [LuxFieldValues.kurz, LuxFieldValues.lang1, LuxFieldValues.lang2]
    });
  }

  renderFn(entry: LuxLookupTableEntry) {
    return '[RenderFn] ' + entry.kurzText;
  }

  changeCustomStyle(event: any) {
    if (event) {
      this.customStyle = { 'text-decoration': 'underline', color: 'green' };
    } else {
      this.customStyle = null;
    }
  }

  changeCustomInvalidStyle(event: any) {
    if (event) {
      this.customInvalidStyle = { 'text-decoration': 'line-through', color: 'red' };
    } else {
      this.customInvalidStyle = null;
    }
  }

  changeOptionUngueltig(event: any) {
    const found = this.options.find(option => option.value === +event.value);
    if (found) {
      this.behandlungUngueltige = found.label;
    }
  }

  changeRequired(required: boolean) {
    this.required = required;
    setRequiredValidatorForFormControl(required, this.form, this.controlBinding);
  }

  pickValidatorValueFn(selected: any) {
    return selected.value;
  }

}
