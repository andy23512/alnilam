import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HotkeysService } from '@ngneat/hotkeys';
import { TranslatePipe } from '@ngx-translate/core';
import { SwitchComponent } from 'src/app/components/switch/switch.component';
import { IconGuardPipe } from 'src/app/pipes/icon-guard.pipe';
import { RealTitleCasePipe } from 'src/app/pipes/real-title-case.pipe';
import { DeviceLayoutStore } from 'src/app/stores/device-layout.store';
import { Layer } from 'tangent-cc-lib';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    SwitchComponent,
    IconGuardPipe,
    TranslatePipe,
    RealTitleCasePipe,
  ],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly router = inject(Router);
  readonly deviceLayoutStore = inject(DeviceLayoutStore);
  firstLessonUrl = '/topic/number/lesson/123';

  @HostBinding('class') classes = 'block relative h-full';

  readonly hotkeysService = inject(HotkeysService);
  readonly Layer = Layer;

  ngOnInit() {
    this.hotkeysService.addShortcut({ keys: 'space' }).subscribe(() => {
      this.router.navigateByUrl(this.firstLessonUrl);
    });
  }

  ngOnDestroy(): void {
    this.hotkeysService.removeShortcuts(['space']);
  }
}
