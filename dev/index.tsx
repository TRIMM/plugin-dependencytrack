import { createDevApp } from '@backstage/dev-utils';
import { dependencytrackPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(dependencytrackPlugin)
  .render();
