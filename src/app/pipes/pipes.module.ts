import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { SearchPipe } from './search.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SearchPipe
  ],
  exports: [
    ImagenPipe,
    SearchPipe
  ]
})
export class PipesModule { }
