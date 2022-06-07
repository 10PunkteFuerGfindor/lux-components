import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-authentic',
  templateUrl: './form-authentic.component.html',
  styleUrls: ['./form-authentic.component.scss']
})
export class FormAuthenticComponent {
  options = [
    { label: 'Brandenburg', short: 'BB', value: 'A' },
    { label: 'Hessen', short: 'HE', value: 'B' },
    { label: 'Nordrhein-Westfalen', short: 'NRW', value: 'C' },
    { label: 'Saarland', short: 'SL', value: 'D' },
    { label: 'Thüringen', short: 'TH', value: 'E' },
  ];

  optionsRadio: { label: string; value: number; disabled?: boolean }[] = [
    { label: 'Nordrhein-Westfalen', value: 1, disabled: true },
    { label: 'Saarland', value: 2 },
    { label: 'Brandenburg', value: 3 }
  ];
  constructor() { }

  

}
