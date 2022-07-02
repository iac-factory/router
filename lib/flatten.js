// export function Flatten(list: any[], depth?: number) {
//   depth = ( typeof depth == "number" ) ? depth : Infinity;
//
//   if ( !depth ) {
//     if ( Array.isArray( list ) ) {
//       return list.map( function (i) { return i; } );
//     }
//     return list;
//   }
//
//   const flat = function (list: Array<[][]>, level: number): [][] {
//     return list.reduce( function (array, item) {
//
//       if ( ( depth ) && Array.isArray( item ) && ( level < depth! ) ) {
//         return array.concat( flat( item, level + 1 ) );
//       } else {
//         return array.concat( item );
//       }
//     }, [] );
//   };
//
//   return flat( list, 1 );
// }

/***
 * @param list {any[]}
 * @param depth {number|undefined}
 */
module.exports = function flatten(list, depth) {
  depth = ( typeof depth == "number" ) ? depth : Infinity;

  if ( !depth ) {
    if ( Array.isArray( list ) ) {
      return list.map( function (i) { return i; } );
    }
    return list;
  }

  /***
   *
   * @param list Array<[][]>
   * @param level {number}
   * @return {[][]}
   */
  const flat = function (list, level) {
    return list.reduce( function (array, item) {

      if ( ( depth ) && Array.isArray( item ) && ( level < depth ) ) {
        return array.concat( flat( item, level + 1 ) );
      } else {
        return array.concat( item );
      }
    }, [] );
  };

  return flat( list, 1 );
}
