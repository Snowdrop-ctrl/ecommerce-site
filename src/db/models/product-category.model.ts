import { Model } from 'objection';
import { ProductModel } from './product.model';

export class ProductCategoryModel extends Model {
  static tableName = 'product_categories';
  static idColumn = 'id';

  id: number;
  name: string;
  imageKey?: string;
  slug: string;
  products: ProductModel[];
  createdAt: Date;
  updatedAt: Date;

  static relationMappings() {
    const { ProuductModel } = require('src/db/models/product.model');
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: ProuductModel,
        join: {
          from: `${ProductCategoryModel.tableName}.${ProductCategoryModel.idColumn}`,
          to: `${ProuductModel.tableName}.category_id`,
        },
      },
    };
  }
}
