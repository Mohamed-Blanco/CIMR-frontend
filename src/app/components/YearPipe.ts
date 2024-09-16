import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'year',
})
export class YearPipe implements PipeTransform {
    transform(value: Date | null): string {
        return `${value?.getFullYear.toString()}`;
    }
}
