import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'collaborateurs',
})
export class CollaPipe implements PipeTransform {
  transform(value: string): string {
    return ` ${value} `;
  }
}
