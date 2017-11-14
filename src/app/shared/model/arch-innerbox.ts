
import {ArchInnerboxtype} from './arch-innerboxtype';

export class ArchInnerbox {

    constructor(
        public innerboxid?: number,
        public innerboxnumber?: number,
        public documenttype?: number,
        public documentdate?: any,
        public documentnumber?: string,
        public reporterid?: number,
        public reporterfullname?: string,
        public reporterdept?: string,
        public documentcontentnote?: string,
        public pagecount?: number,
        public executorid?: number,
        public executorfullname?: string,
        public executersign?: boolean,
        public executerdate?: any,
        public executesign?: boolean,
        public note?: string,
        public innerboxtypeByDocumenttype?: ArchInnerboxtype
    ) {
    }
}
