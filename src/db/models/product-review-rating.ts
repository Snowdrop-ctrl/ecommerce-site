import { Model } from 'objection';
import { UserModel } from './user.model';

export class ProductReviewRatingModel extends Model {
  static tableName = 'product_reviews_ratings';
  static idColumn = 'id';

  id: number;
  review: string;
  rating: number;
  userId: number;
  user: UserModel;
  productId: number;
  product: UserModel;
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { UserModel } = require('./user.model');
    const { ProductModel } = require('./product.model');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${ProductReviewRatingModel.tableName}.user_id`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: `${ProductReviewRatingModel.tableName}.product_id`,
          to: `${ProductModel.tableName}.${ProductModel.idColumn}`,
        },
      },
    };
  }
}
