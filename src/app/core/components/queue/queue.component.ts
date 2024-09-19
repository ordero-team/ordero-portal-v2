import { AkaAnimations } from '@aka/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { PubsubService } from '@app/core/services/pubsub.service';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { StaffState } from '@app/core/states/staff/staff.state';
import { Profile } from '@cl/profile.collection';
import { Queue, QueueService } from '@cs/queue.service';
import { AuthState } from '@ct/auth/auth.state';
import { download } from '@lib/download';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
import { ColorService } from '@ss/color.service';
import { capitalize, has, unionBy } from 'lodash';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'aka-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  animations: AkaAnimations,
})
export class QueueComponent implements OnInit {
  showQueues = true;

  @Select(AuthState.currentUser) user$: Observable<Profile>;
  @Select(OwnerState.currentUser) owner$: Observable<OwnerProfile>;
  @Select(StaffState.currentUser) staff$: Observable<StaffProfile>;

  queues: Queue[] = [];

  @ViewChild('alertDialog', { static: true }) alertDialog: TemplateRef<any>;

  constructor(public service: QueueService, public color: ColorService, public matDialog: MatDialog) {
    const subscribeToUserEvent = (user$: Observable<Profile | OwnerProfile | StaffProfile>) => {
      user$.pipe(takeWhile((user) => !has(user, 'id'), true)).subscribe((user) => {
        if (has(user, 'id')) {
          PubsubService.getInstance().event(`ordero/${user.id}/event`, (data) => this.setQueue(data));
        }
      });
    };

    subscribeToUserEvent(this.user$);
    subscribeToUserEvent(this.owner$);
    subscribeToUserEvent(this.staff$);
  }

  ngOnInit(): void {
    this.service.queues$.pipe(untilDestroyed(this)).subscribe((val) => {
      this.queues = val;
    });
  }

  setQueue(data: any) {
    const { request_id, request = {}, status } = data;
    const queue = this.service.get(request_id || request.id);

    if (queue) {
      const res = queue.update({ data });
      this.service.queues = unionBy(this.service.queues, [res], 'id');
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
