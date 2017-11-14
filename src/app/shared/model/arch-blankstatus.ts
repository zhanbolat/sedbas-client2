import {ArchBlank} from './arch-blank';

export class ArchBlankstatus {
    constructor(
        public id: number,
        public runame: string,
        public kzname?: string,
        public engname?: string,
        public blanksById?: ArchBlank[]
    ) {
    }
}
