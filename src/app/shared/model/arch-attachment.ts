import {ArchBDocumenttable} from './arch-documenttable';

export class ArchAttachment {
    constructor(
        public attachmentid: number,
        public documentid?: number,
        public filename?: string,
        public mimetype?: string,
        public filecontent?: string,
        public documenttableid?: number,
        public documenttableByDocumenttableid?: ArchBDocumenttable,
        public fileUrl?: any
    ) {
    }
}
