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
    const ms = this.duration;
    const parsed = {
      days: Math.trunc(ms / 86400000),
      hours: Math.trunc(ms / 3600000) % 24,
      minutes: Math.trunc(ms / 60000) % 60,
      seconds: Math.trunc(ms / 1000) % 60,
      ms: Math.trunc(ms) % 1000
    };
    return [
      parsed.days ? `${parsed.days}d` : null,
      parsed.hours ? `${parsed.hours}h` : null,
      parsed.hours ? `${parsed.minutes}m` : null,
      parsed.hours ? `${parsed.seconds}s` : null,
      parsed.hours ? `${parsed.ms}ms` : null,
    ].filter(d => !!d).join(' ');
  }
}