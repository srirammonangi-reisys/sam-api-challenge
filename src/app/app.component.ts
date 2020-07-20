import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 3, rows: 1, color: 'lightgreen'}
  ];
  options = {
    pscValue : ['Onefasfadsfafsdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdffadsfasdfasdfa', 'Two', 'Three']
  };
  pscFilteredOptions: Observable<string[]>;

  profileForm = this.fb.group({
    fromDate: [],
    pscValue: [''],
    textValue: ['']
  });

  

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(){
    this.pscFilteredOptions = this.valueChanges('pscValue');
  }

  valueChanges(formField){
    return this.profileForm.get(formField).valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value,formField))
    );
  }

  private _filter(value: string,formField: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options[formField].filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
