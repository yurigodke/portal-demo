export class Storage {
  constructor(interval, id) {
    this.id = id;
    this.updateInterval = interval;
    this.currentPositions = {};
  }

  getData = () => {
    const dataPosStr = localStorage.getItem('dataPos');
    const dataPos = JSON.parse(dataPosStr);

    const currentTimeStamp = new Date().getTime()

    const dataPosIds = Object.keys(dataPos);
    const idToDelete = dataPosIds.filter(siteId => {
      if (!dataPos[siteId].timestamp) {
        return true;
      }

      const timeStampDiff = currentTimeStamp - dataPos[siteId].timestamp;

      if (timeStampDiff > (this.updateInterval * 1.1)) {
        return true;
      }
    })

    idToDelete.forEach(siteId => {
      delete dataPos[siteId]
    });

    return dataPos;
  }

  saveData = (data) => {
    if (!this.id) {
      return;
    }

    const dataPos = this.getData();
    const timestamp = new Date().getTime()

    const currentPosition = {
      ...dataPos,
      [this.id]: {
        ...data,
        timestamp
      }
    }

    localStorage.setItem('dataPos', JSON.stringify(currentPosition));

    this.currentPositions = currentPosition;

    return currentPosition;
  }

  getOthersPoints = () => {
    if (!this.id) {
      return {}; 
    }

    const currentPoints = {
      ...this.currentPositions
    }

    delete currentPoints[this.id];

    return currentPoints;
  }
}