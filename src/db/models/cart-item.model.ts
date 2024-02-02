// import { Model } from 'objection';
// import { CartModel } from 'src/db/models/cart.model';

// export class CartItemModel extends Model {
//   static tableName = 'cart_items';
//   static idColumn = 'id';

//   id: number;
//   variantPriceId: number;
//   quantity: number;
//   cartId: number;
//   cart: CartModel;
//   createdAt: Date;
//   updatedAt: Date;

//   static relationMappings() {
//     const { CartModel } = require('src/db/models/cart.model');

//     return {
//       cart: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: CartModel,
//         join: {
//           from: `${CartItemModel.tableName}.cart_id`,
//           to: `${CartModel.tableName}.${CartModel.idColumn}`,
//         },
//       },
//     };
//   }
// }
