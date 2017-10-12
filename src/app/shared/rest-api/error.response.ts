import { ResponseModel } from './response'

export class ErrorResponse extends ResponseModel {
    exception: string
    message: string
    explanations: string[]
}
