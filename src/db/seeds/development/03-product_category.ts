import { Knex } from "knex";
import { ProductCategoryModel } from "src/db/models/product-category.model";

const productCategoryToAdd: Partial<ProductCategoryModel>[] = [
    {
        name: 'Smartphone',
        slug: 'smartphone',
    },
    {
        name: 'Clothing',
        slug: 'clothing',
    }
]

export async function seed(knex: Knex): Promise<void> {
    const roles = await knex('product_categories').select('*');
    if (!roles.length) {
      await knex.batchInsert('product_categories', productCategoryToAdd);
    }
};
