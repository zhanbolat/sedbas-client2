
import {ArchOutboxtype} from './arch-outboxtype';

export class ArchOutbox {

    constructor(
        public outboxid?: number,
        public outboxnumber?: number,
        public documenttype?: number,
        public documentnumber?: string,
        public documentdate?: any,
        public forwhom?: string,
        public documentcontentnote?: string,
        public pagecount?: number,
        public inboxnumber?: string,
        public docownerfullname?: string,
        public docownersign?: boolean,
        public outboxtypeByDocumenttype?: ArchOutboxtype
    ) {
    }
}
