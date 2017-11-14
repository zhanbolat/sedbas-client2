import {ArchBlank} from './arch-blank';

export class ArchBlanktype {
    constructor(
        public id: number,
        public runame: string,
        public kzname?: string,
        public engname?: string,
        public blanksById?: ArchBlank[]
    ) {
    }
}
