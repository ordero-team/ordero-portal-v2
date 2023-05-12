import { AkaAnimations } from '@aka/animations';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PubsubService } from '@app/core/services/pubsub.service';
import { Profile } from '@cl/profile.collection';
import { Queue, QueueService } from '@cs/queue.service';
import { AuthState } from '@ct/auth/auth.state';
import { download } from '@lib/download';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
import { ColorService } from '@ss/color.service';
import { capitalize, has } from 'lodash';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'aka-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  animations: AkaAnimations,
})
export class QueueComponent {
  showQueues = true;

  @Select(AuthState.currentUser) user$: Observable<Profile>;

  @ViewChild('alertDialog', { static: true }) alertDialog: TemplateRef<any>;

  constructor(public service: QueueService, public color: ColorService, public matDialog: MatDialog) {
    this.user$.pipe(takeWhile((user) => !has(user, 'id'), true)).subscribe((user) => {
      if (has(user, 'id')) {
        PubsubService.getInstance().event(`kelola/${user.id}/event`, (data) => {
          this.setQueue(data);
        });
      }
    });
  }

  setQueue(data: any) {
    const { request_id, request = {}, status } = data;
    const queue = this.service.get(request_id || request.id);

    if (queue) {
      const res = queue.update({ data });

      if (status === 'fail') {
        res.fail(res);
      } else if (status === 'warning') {
        res.warning(res);
      } else {
        res.finish();
      }
    }
  }

  toCapitalize(status: string): string {
    return capitalize(status);
  }

  onOpenDialog(queue: Queue) {
    const { configs } = queue;
    this.matDialog.open(this.alertDialog, { data: configs.data });
  }

  onDownload(queue: Queue) {
    const { configs } = queue;
    download(configs.data.payload.body);
  }
}
