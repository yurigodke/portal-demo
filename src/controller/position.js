export class Position {

  get windowHeight() {
    return window.screen.height;
  }

  get windowWidth() {
    return window.screen.width;
  }

  get browserHeight() {
    return window.outerHeight;
  }

  get browserWidth() {
    return window.outerWidth;
  }

  get usableHeight() {
    return window.innerHeight;
  }

  get usableWidth() {
    return window.innerWidth;
  }

  get unusableHeight() {
    return this.browserHeight - this.usableHeight;
  }

  get unusableWidth() {
    return this.browserWidth - this.usableWidth;
  }

  get browserDistanceTop() {
    return this.unusableHeight;
  }

  get browserDistanceRight() {
    return this.unusableWidth;
  }

  get browserDistanceBottom() {
    return 0;
  }

  get browserDistanceLeft() {
    return 0;
  }

  get windowTop() {
    return window.screenY;
  }

  get windowBottom() {
    return this.windowHeight - (this.windowTop + this.browserHeight);
  }

  get windowLeft() {
    return window.screenX;
  }

  get windowRight() {
    return this.windowWidth - (this.windowLeft + this.browserWidth);
  }

  getData() {
    return {
      windowTop: this.windowTop,
      windowLeft: this.windowLeft,
      windowBottom: this.windowBottom,
      windowRight: this.windowRight,
      windowHeight: this.windowHeight,
      unusableHeight: this.unusableHeight,
      usableHeight: this.usableHeight,
      windowWidth: this.windowWidth,
      unusableWidth: this.unusableWidth,
      usableWidth: this.usableWidth,
      browserDistanceTop: this.browserDistanceTop,
      browserDistanceRight: this.browserDistanceRight,
      browserDistanceBottom: this.browserDistanceBottom,
      browserDistanceLeft: this.browserDistanceLeft,
    }
  }

  getLocalCenterPosition() {
    return {
      y: this.usableHeight / 2,
      x: this.usableWidth / 2
    }
  }

  getGlobalCenterPosition(localCenter) {
    if (!localCenter) {
      localCenter = this.getLocalCenterPosition();
    }

    return {
      y: localCenter.y + this.windowTop + this.unusableHeight,
      x: localCenter.x + this.windowLeft
    }
  }

  getCenterPosition() {
    const localCenter = this.getLocalCenterPosition();

    const globalCenter = this.getGlobalCenterPosition(localCenter);

    return {
      localCenter,
      globalCenter
    }
  }

  getUsableSize() {
    return {
      height: this.usableHeight,
      width: this.usableWidth
    }
  }

  getScreenPosition() {
    return {
      browserWidth: this.browserWidth,
      browserHeight: this.browserHeight,
      usableHeight: this.usableHeight,
      usableWidth: this.usableWidth,
      windowTop: this.windowTop,
      windowLeft: this.windowLeft,
    }
  }

  convertToLocal(centerToConvert) {
    const localCenter = this.getLocalCenterPosition();
    const globalCenter = this.getGlobalCenterPosition(localCenter);

    const globalXDist = centerToConvert.x - globalCenter.x;
    const globalYDist = centerToConvert.y - globalCenter.y;

    return {
      x: localCenter.x + globalXDist,
      y: localCenter.y + globalYDist
    }
  }
}