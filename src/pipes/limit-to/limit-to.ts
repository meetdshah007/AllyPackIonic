import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LimitToPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'limitTo',
})
export class LimitToPipe implements PipeTransform {
  /**
   * Takes a value and trim it.
   */
  transform(value: string, ...args) {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
