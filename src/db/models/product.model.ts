import { Model } from 'objection';
import { type UserModel } from 'src/db/models/user.model';
import { ProductCategoryModel } from './product-category.model';

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
  image_key: string;
  categoryId: number;
  category: ProductCategoryModel
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { ProductCategoryModel } = require('./product-category.model');
    return {
        category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductCategoryModel,
        join: {
          from: `${ProductModel.tableName}.category_id`,
          to: `${ProductCategoryModel.tableName}.${ProductCategoryModel.idColumn}`,
        },
      },
    };
  }
}
