import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }

        // console.log('filtered data = {' + JSON.stringify(items.filter(
        //     singleItem =>
        //         singleItem[field].toLowerCase().includes(value.toLowerCase()))));
        return items.filter(
            singleItem => {
                const notMatchingField = Object.keys(singleItem)
                    .find(key => {
                        if (singleItem[key] != null && singleItem[key] !== undefined) {
                            return singleItem[key].toString().toLowerCase().includes(value.toLowerCase());
                        } else {
                            return false;
                        }
                    });
                if (notMatchingField !== null && notMatchingField !== undefined && notMatchingField !== '') {
                    return true;
                } else {
                    return false;
                }
            });

    }
}
