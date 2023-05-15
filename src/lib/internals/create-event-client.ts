import {Observable, Subject} from "rxjs";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {createChecksum} from "./utilities";

/** @internal */
export function createEventClient(): EventClient {
  return new EventClient();
}

/** @internal */
export interface EventClientItem {
  id: string;
  data$: Subject<any>;
  observer$: Observable<EventClientEvent>;
}

export interface EventClientEvent<RequestData = any, ResponseData = any> {
  request?: AxiosRequestConfig<RequestData>|null;
  response?: AxiosResponse<ResponseData, RequestData>|null;
  error?: AxiosError<ResponseData, RequestData>|null;
}

/** @internal */
export class EventClient {
  private eventHandlers: EventClientItem[] = [];

  /**
   * Returns an observable for the specific event
   * @param id
   */
  on<RequestData = any, ResponseData = any>(id: string|Function): Observable<EventClientEvent<RequestData, ResponseData>> {
    if(!this.eventHandlers.filter(h => h.id === formatEventId(id)).length){
      const data$ = new Subject<EventClientEvent<RequestData, ResponseData>>();
      this.eventHandlers.push({
        id: formatEventId(id),
        data$: data$,
        observer$: data$.asObservable()
      });
    }
    return this.eventHandlers.find(h => h.id === formatEventId(id)).observer$;
  }

  /**
   * Emits a new value to the handler
   * @param id
   * @param data
   */
  emit<RequestData = any, ResponseData = any>(id: string|Function, data: EventClientEvent<RequestData, ResponseData>): EventClientEvent<RequestData, ResponseData> {
    this.eventHandlers.map(handler => {
      if(handler.id === formatEventId(id)){
        handler.data$.next(data);
      }
    });
    return data;
  }

  /**
   * Emits a new event from the axios response
   * @param id
   * @param response
   */
  emitFromResponse<RequestData = any, ResponseData = any>(id: string|Function, response: AxiosResponse<ResponseData, RequestData>): EventClientEvent<RequestData, ResponseData> {
    return this.emit(id, {
      request: response.config,
      response: response,
      error: null,
    });
  }

  /**
   * Emits a new event from the axios error
   * @param id
   * @param error
   */
  emitFromError<RequestData = any, ResponseData = any>(id: string|Function, error: AxiosError<ResponseData, RequestData>): EventClientEvent<RequestData, ResponseData> {
    return this.emit(id, {
      request: error.request,
      response: error.response,
      error: error,
    });
  }


  /**
   * Destroys all eventHandlers or the specific id
   * @param id
   */
  destroy(id?: string|Function|null): this {
    this.eventHandlers = this.eventHandlers.filter(handler => {
      if(!id || handler.id === formatEventId(id)) {
        handler.data$.complete();
        return false;
      }
      return true;
    });
    return this;
  }
}

/** @internal */
function formatEventId(id: string|Function|null): string|null {
  switch(true){
    case typeof id === 'function': return createChecksum(id.toString().trim().toLowerCase());
    case typeof id === 'string': return (id as string).trim().toLowerCase();
    default: return null;
  }
}