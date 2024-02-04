import { Model } from 'objection';
import { type UserModel } from 'src/db/models/user.model';
import { ProductCategoryModel } from './product-category.model';
import { CartItemModel } from './cart-item.model';
import { ProductReviewRatingModel } from './product-review-rating';

export class ProductModel extends Model {
  static tableName = 'products';
  static idColumn = 'id';

  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  currency: string;
  imageKey: string;
  categoryId: number;
  category: ProductCategoryModel;
  cartItems: CartItemModel[];
  productReviewRatings: ProductReviewRatingModel[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { ProductCategoryModel } = require('./product-category.model');
    const { CartItemModel } = require('./cart-item.model');
    const { ProductReviewRatingModel } = require('./product-review-rating');

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductCategoryModel,
        join: {
          from: `${ProductModel.tableName}.category_id`,
          to: `${ProductCategoryModel.tableName}.${ProductCategoryModel.idColumn}`,
        },
      },
      cartItems: {
        relation: Model.HasManyRelation,
        modelClass: CartItemModel,
        join: {
          from: `${ProductModel.tableName}.id`,
          to: `${CartItemModel.tableName}.product_id`,
        },
      },
      productReviewRatings: {
        relation: Model.HasManyRelation,
        modelClass: ProductReviewRatingModel,
        join: {
          from: `${ProductModel.tableName}.id`,
          to: `${ProductReviewRatingModel.tableName}.product_id`,
        },
      },
    };
  }
}
