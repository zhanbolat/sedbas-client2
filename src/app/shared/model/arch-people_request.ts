export class ArchPeopleRequest {

    constructor(
        public peoplerequestid?: number,
        public documentnumber?: string,
        public address?: string,
        public documentcontentnote?: number,
        public pagecount?: number,
        public forwhoom?: string,
        public executorid?: number,
        public executorfullname?: string,
        public executersign?: boolean,
        public executerdate ?: any,
        public executesign?: boolean,
        public note?: string,
    ) {
    }
}
