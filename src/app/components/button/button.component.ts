import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() textButton: string;
  @Input() size: string = "auto";

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
