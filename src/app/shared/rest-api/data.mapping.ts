import { Response } from '@angular/http'

import { DataMappingInterface } from './data.mapping.interface'

export class DataMapping implements DataMappingInterface {

    mapResponseArray(res: Response) {
        let dataArray = res.json()
        return dataArray || [ ]
    }

    mapResponse(res: Response) {
        let dataObject = res.json()
        return dataObject || { }
    }

}
