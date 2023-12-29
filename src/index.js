import { Animation } from './controller/animation';
import { Position } from './controller/position';
import { Screen } from './controller/screen';

import './index.scss';

const position = new Position();
const screen = new Screen();
const animation = new Animation(position, screen.id);


let screenPosition = position.getScreenPosition();
screen.watchPosition(() => {
  const newScreenPosition = position.getScreenPosition();

  if (JSON.stringify(screenPosition) != JSON.stringify(newScreenPosition)) {
    animation.updateContainers();
    screenPosition = newScreenPosition;
  }
})