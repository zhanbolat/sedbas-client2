import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ArchInnerbox } from '../../../shared/model/arch-innerbox';

@Injectable()
export class ArchInnerboxService {

    private resourceUrl = 'earchive/innerboxes';

    constructor(private http: Http) { }

    create(innerbox: ArchInnerbox): Observable<ArchInnerbox> {
        const copy: ArchInnerbox = Object.assign({}, innerbox);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(innerbox: ArchInnerbox): Observable<ArchInnerbox> {
        const copy: ArchInnerbox = Object.assign({}, innerbox);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<ArchInnerbox> {
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
