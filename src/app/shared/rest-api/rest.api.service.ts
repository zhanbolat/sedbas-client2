
import { Injectable } from '@angular/core'
import { Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

import { DataMappingInterface } from './data.mapping.interface'
import { DataMapping } from './data.mapping'
import { ResponseModel } from './response'
import { ErrorResponse } from './error.response'

@Injectable()
export abstract class RestApiService {

    protected mapping: DataMappingInterface = new DataMapping()

    protected mapSuccessResponse(res: Response) {
        let successResponse: ResponseModel = new ResponseModel()
        successResponse.status = res.status
        successResponse.statusText = res.statusText
        return successResponse
    }

    protected handleResponseError(error: Response | any) {
        let errorResponse: ErrorResponse = new ErrorResponse()
        if (error instanceof Response) {
            errorResponse.status = error.status
            errorResponse.statusText = error.statusText
            const body = error.json()
            errorResponse.exception = body.exception
            errorResponse.message = body.message
            errorResponse.explanations = body.explanations
        } else {
            errorResponse.status = 0
            errorResponse.statusText = error.message ? error.message : error.toString()
        }
        return Observable.throw(errorResponse)
    }

}
