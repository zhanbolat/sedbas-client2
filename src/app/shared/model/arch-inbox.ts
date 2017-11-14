
import {ArchInboxtype} from './arch-inboxtype';

export class ArchInbox {

    constructor(
        public inboxid?: number,
        public inboxnumber?: number,
        public documenttype?: number,
        public documentdate?: any,
        public fromwhoom?: string,
        public documentcontentnote?: string,
        public pagecount?: number,
        public executorid?: number,
        public executorfullname?: string,
        public executersign?: boolean,
        public executerdate?: any,
        public executesign?: boolean,
        public note?: string,
        public inboxtypeByDocumenttype?: ArchInboxtype
    ) {
    }
}
