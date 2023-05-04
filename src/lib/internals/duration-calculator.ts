/** @internal */
export function createDurationCalculator(): DurationCalculator {
  return new DurationCalculator();
}

/** @internal */
export class DurationCalculator {
  private _startDate: Date;
  private _endDate: Date;

  get startDate(): Date { return this._startDate; }
  get endDate(): Date { return this._endDate; }

  start(): this {
    this._startDate = new Date();
    return this;
  }

  stop(): this {
    this._startDate = new Date();
    return this;
  }

  get duration(): number {
    if(!this.startDate || !this.endDate){
      return 0;
    }
    return this.endDate.getTime() - this.endDate.getTime();
  }

  get durationString(): string {
    const duration = this.duration;
    const days = Math.trunc(duration / 86400000);
    const hours = Math.trunc(duration / 3600000) % 24;
    const minutes = Math.trunc(duration / 60000) % 60;
    const seconds = Math.trunc(duration / 1000) % 60;
    switch(true){
      case days > 0: return days + 'd';
      case hours > 0: return hours + 'h';
      case minutes > 0: return minutes + 'm';
      case seconds > 0: return seconds + 's';
      default: return duration + 'ms';
    }
  }
}