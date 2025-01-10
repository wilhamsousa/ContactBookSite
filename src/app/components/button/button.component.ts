import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() textButton: string;
  @Input() size: string = "auto";
  @Input() isDisabled: boolean = false;

  constructor(){
    console.log("constructor");
  }

  ngOnInit(){
    console.log("ngOnInit");
  }

  // ngOnChanges(){
  //   console.log("ngOnChanges");
  // }

  // ngDoCheck(){
  //   console.log("ngDoCheck");
  // }

  // ngAfterContentInit(){
  //   console.log("ngAfterContentInit");
  // }

  // ngAfterContentChecked(){
  //   console.log("ngAfterContentChecked");
  // }

  // ngAfterViewInit(){
  //   console.log("ngAfterViewInit");
  // }

  // ngAfterViewChecked(){
  //   console.log("ngAfterViewChecked");
  // }

  // ngOnDestroy(){
  //   console.log("ngOnDestroy");
  // }

  test(){
    console.log("click");
  }
}
