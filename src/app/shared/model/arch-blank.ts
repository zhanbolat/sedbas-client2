import {ArchBlanktype} from './arch-blanktype';
import {ArchBlankstatus} from './arch-blankstatus';

export class ArchBlank {

    constructor(
        public blankid?: number,
        public blanktype?: number,
        public manufacturer?: string,
        public exemplarcount?: number,
        public addresseeid?: number,
        public addresseefullname?: string,
        public addresseplacement?: string,
        public blankcomment?: string,
        public blankstatus?: number,
        public usednote?: string,
        public blanktypeByBlanktype?: ArchBlanktype,
        public blankstatusByBlankstatus?: ArchBlankstatus
    ) {
    }
}
