import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ArchOutbox } from '../../../shared/model/arch-outbox';

@Injectable()
export class ArchOutboxService {

    private resourceUrl = 'earchive/outboxes';

    constructor(private http: Http) { }

    create(outbox: ArchOutbox): Observable<ArchOutbox> {
        const copy: ArchOutbox = Object.assign({}, outbox);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(outbox: ArchOutbox): Observable<ArchOutbox> {
        const copy: ArchOutbox = Object.assign({}, outbox);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ArchOutbox> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    // query(req?: any): Observable<Response> {
    //     const options = this.createRequestOption(req);
    //     return this.http.get(this.resourceUrl, options)
    //     ;
    // }

    query(): Observable<Response> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }
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
