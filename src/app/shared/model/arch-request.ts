export class ArchRequest {

    constructor(
        public id?: number,
        public userid?: number,
        public studentphone?: string,
        public studentid?: number,
        public studentemail?: string,
        public studentfacultyid?: string,
        public studentspeciality?: string,
        public studentspecialitycode?: string,
        public studentlang?: string,
        public studentcourse?: number,
        public studentname?: string,
        public studentsurname?: string,
        public studentlastname?: string,
        public studentfinance?: string,
        public studentform?: string,
        public appdate?: any,
        public appchildtypeid?: number,
        public bonAppchildtypestr?: string,
        public bonApptypestr?: string,
        public requesttext?: string,
        public requeststatus?: number,
        public systemcomment?: string,
        public rectorvisetext?: string,
        public idfrommysql?: number
    ) {
    }
}
