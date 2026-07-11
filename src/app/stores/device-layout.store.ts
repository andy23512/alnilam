import {
  withDevtools,
  withStorageSync,
} from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  setAllEntities,
  withEntities
} from '@ngrx/signals/entities';
import {
  CCLITE_DEFAULT_DEVICE_LAYOUT,
  DeviceLayout
} from 'tangent-cc-lib';
import { prefixStorageKey } from '../utils/store.utils';
import { withSelectedEntity } from './selected-entity.feature';

export const DeviceLayoutStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withDevtools('deviceLayout'),
  withStorageSync(prefixStorageKey('deviceLayout')),
  withEntities<DeviceLayout>(),
  withSelectedEntity(),
  withComputed((state) => ({
    selectedEntityLayerNumber: computed((): number | null => {
      const selectedEntity = state.selectedEntity();
      if (!selectedEntity) {
        return null;
      }
      return selectedEntity.layout.length;
    }),
  })),
  withMethods((store) => ({
    load() {
      patchState(store, setAllEntities([CCLITE_DEFAULT_DEVICE_LAYOUT]));
      store.setSelectedId(CCLITE_DEFAULT_DEVICE_LAYOUT.id);
    },
  })),
  withHooks({
    onInit: (store) => {
      if (store.selectedId() === null) {
        return store.load();
      }
    },
  }),
);
