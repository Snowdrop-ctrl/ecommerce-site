import { Model } from 'objection';
import { type UserModel } from 'src/db/models/user.model';
import { Product } from 'src/products/entities/product.entity';

export class ProductCategoryModel extends Model {
  static tableName = 'product_categories';
  static idColumn = 'id';

  id: number;
  name: string;
  imageKey?: string;
  slug: string;
  products: Product[];
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
