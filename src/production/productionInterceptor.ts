import {Injectable} from "@angular/core";
import {
  XHRBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  Headers
} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';


@Injectable()
export class ProductionInterceptor extends Http{
  constructor(
    private backend: XHRBackend,
    private defaultOptions: RequestOptions
  ) {
    super(backend,defaultOptions);
    this.backend = backend;
  }
  start(): void {
    console.log("started production");
    console.log(this);
  }
  get(url:string,requestOptions?: RequestOptionsArgs){
    let headers = new Headers();
    console.log('THIS GET', url);
    headers.append('Content-Type','application/json');

    if(!url.includes('maps.googleapis.com')) {
      if(!!localStorage.getItem('com.cdashboard.token')){
        headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
        let options = new RequestOptions({ headers: headers });
        return super.get(url,options).catch(this.handleError);
      }
    }
    return super.get(url).catch(this.handleError);

  }
  post(url:string,body:any,requestOptions?: RequestOptionsArgs){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if(!!localStorage.getItem('com.cdashboard.token')){
      headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
    }
    let options = new RequestOptions({ headers: headers });
    return super.post(url,body,options);
  }
  put(url:string,body:any,requestOptions?: RequestOptionsArgs){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if(!!localStorage.getItem('com.cdashboard.token')){
      headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
    }
    let options = new RequestOptions({ headers: headers });
    return super.put(url,body,options);
  }
  delete(url: string, requestOptions?: RequestOptionsArgs): Observable<Response>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if(!!localStorage.getItem('com.cdashboard.token')){
      headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
    }
    let options = new RequestOptions({ headers: headers });
    return super.delete(url,options);
  }
  patch(url: string, body: any, requestOptions?: RequestOptionsArgs): Observable<Response>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if(!!localStorage.getItem('com.cdashboard.token')){
      headers.append('Authorization','Basic '+localStorage.getItem('com.cdashboard.token'));
    }
    let options = new RequestOptions({ headers: headers });
    return super.patch(url,body,options);
  }
  handleError(error: Response) {
       // Do messaging and error handling here
      return Observable.throw(error);
   }
}
