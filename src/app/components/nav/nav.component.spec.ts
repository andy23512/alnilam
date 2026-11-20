import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { HotkeyDialogComponent } from '../hotkey-dialog/hotkey-dialog.component';
import { HOTKEY_DIALOG_ID } from '../hotkey-dialog/hotkey-dialog.const';
import { NavComponent } from './nav.component';

describe('NavComponent hotkey dialog button', () => {
  let component: NavComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideTranslateService()],
    });
    dialog = TestBed.inject(MatDialog);
    component = TestBed.createComponent(NavComponent).componentInstance;
  });

  afterEach(() => {
    dialog.closeAll();
    localStorage.clear();
  });

  it('opens the hotkey dialog under its own id', async () => {
    const open = spyOn(dialog, 'open');
    await component.openHotkeyDialog();
    expect(open).toHaveBeenCalledOnceWith(HotkeyDialogComponent, {
      id: HOTKEY_DIALOG_ID,
    });
  });

  it('does not open a second one while it is open', async () => {
    await component.openHotkeyDialog();
    expect(dialog.getDialogById(HOTKEY_DIALOG_ID)).toBeTruthy();
    const open = spyOn(dialog, 'open').and.callThrough();
    await component.openHotkeyDialog();
    expect(open).not.toHaveBeenCalled();
    expect(dialog.openDialogs.length).toBe(1);
  });
});
