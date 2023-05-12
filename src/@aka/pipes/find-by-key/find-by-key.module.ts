import { NgModule } from '@angular/core';
import { AkaFindByKeyPipe } from '@aka/pipes/find-by-key/find-by-key.pipe';

@NgModule({
  declarations: [AkaFindByKeyPipe],
  exports: [AkaFindByKeyPipe],
})
export class AkaFindByKeyPipeModule {}
