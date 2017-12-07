import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ArchAttachmentService {

    private resourceUrl = 'earchive/attachments';

    constructor(private http: Http) { }

    // create(inbox: ArchInbox): Observable<ArchInbox> {
    //     const copy: ArchInbox = Object.assign({}, inbox);
    //     return this.http.post(this.resourceUrl, copy).map((res: Response) => {
    //         return res.json();
    //     });
    // }
    //
    // update(inbox: ArchInbox): Observable<ArchInbox> {
    //     const copy: ArchInbox = Object.assign({}, inbox);
    //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
    //         return res.json();
    //     });
    // }

    find(docid: number, doctableid: number): Observable<Response> {
        // .map((res: Response) => {return res.json();
        return this.http.get(`${this.resourceUrl}/find/${docid}/${doctableid}`);
    }

    // query(req?: any): Observable<Response> {
    //     const options = this.createRequestOption(req);
    //     return this.http.get(this.resourceUrl, options)
    //     ;
    // }

    query(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    // delete(id: number): Observable<Response> {
    //     return this.http.delete(`${this.resourceUrl}/${id}`);
    // }
    // private createRequestOption(req?: any): BaseRequestOptions {
    //     const options: BaseRequestOptions = new BaseRequestOptions();
    //     if (req) {
    //         const params: URLSearchParams = new URLSearchParams();
    //         params.set('page', req.page);
    //         params.set('size', req.size);
    //         if (req.sort) {
    //             params.paramsMap.set('sort', req.sort);
    //         }
    //         params.set('query', req.query);
    //
    //         options.search = params;
    //     }
    //     return options;
    // }
}
