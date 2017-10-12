import { Response } from '@angular/http'
import {DataMappingInterface} from './data.mapping.interface';
import {Session} from '../model/session';

export class SessionMapping implements DataMappingInterface {

    mapResponse(res: Response) {
        let body = res.json()
        let headers = res.headers
        let sessionData: Session = new Session(body, headers)
        return sessionData
    }

    mapResponseArray(res: Response) {
        return this.mapResponse(res)
    }

}
