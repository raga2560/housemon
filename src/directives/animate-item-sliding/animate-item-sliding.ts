

/**
 * Generated class for the AnimateItemSlidingDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */

import { Directive, ElementRef, Renderer, Input } from '@angular/core';
 
@Directive({
  selector: '[animateItemSliding]'
})
export class AnimateItemSliding {
 
  @Input('animateItemSliding') shouldAnimate: boolean;
 
  constructor(public element: ElementRef, public renderer: Renderer) {
 
  }
 
  ngOnInit(){
 
    if(this.shouldAnimate){
 
      this.renderer.setElementClass(this.element.nativeElement, 'active-slide', true);
      this.renderer.setElementClass(this.element.nativeElement, 'active-options-right', true);
	  var rand =  Math.random();
 
      // Wait to apply animation
      setTimeout(() => {
		  let switch1:boolean ;
		  if(rand > 0.5)
		  {
			  switch1 = true;
		  }
		  else {
			  switch1 = false;
		  }
		  
		  
			  // console.log(switch1);
		  if(switch1){
		this.renderer.setElementClass(this.element.nativeElement.firstElementChild, 'rightitemSlidingAnimation', true);	  
		  }else{
			  this.renderer.setElementClass(this.element.nativeElement.firstElementChild, 'itemSlidingAnimation', true);
		  }
        
		
      }, 200 + rand *10000);
 
    }
 
  }
 
}