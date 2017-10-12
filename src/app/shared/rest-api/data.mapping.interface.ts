import { Response } from '@angular/http'

export interface DataMappingInterface {
    mapResponse(response: Response): any
    mapResponseArray(response: Response): any
}
