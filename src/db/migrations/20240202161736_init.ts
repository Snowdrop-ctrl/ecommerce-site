import type { Knex } from "knex";
import { onUpdateTrigger } from "../utils";
import { OrderStatus, PaymentMode } from "../models/order.model";



export async function up(knex: Knex): Promise<void> {
    await knex.transaction(async (trx) => {

        await trx.schema
        .createTable('roles', (table) => {
            table.increments('id').unsigned().notNullable().primary();
            table.string('name').notNullable();
            table.string('slug').unique().notNullable();
            table.timestamps(true, true);
        })
        .then(() => knex.raw(onUpdateTrigger('roles')));

        await trx.schema.createTable('users',table => {
            table.increments('id').primary().notNullable()
            table.string('first_name').notNullable()
            table.string('last_name').nullable()
            table.string('email').unique().notNullable()
            table.string('password').notNullable();
            table.string('phone_number').nullable();
            table.string('profile_picture_key').nullable();
            table.string('address').nullable();
            table.string('country').nullable();
            table.string('state').nullable();
            table.integer('role_id').notNullable();
            table.foreign('role_id').references('roles.id');
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('users')));

        await trx.schema.createTable('product_categories',table => {
            table.increments('id').primary().notNullable()
            table.string('name').notNullable()
            table.string('image_key').nullable()
            table.string('slug').unique().notNullable()
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('product_categories')));


        await trx.schema.createTable('products',table => {
            table.increments('id').primary().notNullable()
            table.string('name').notNullable()
            table.string('sku').unique().nullable();
            table.string('description').notNullable()
            table.integer('price').notNullable()
            table.integer('stock').notNullable()
            table.string('currency').notNullable()
            table.string('image_key').notNullable()
            table.integer('category_id').notNullable();
            table.foreign('category_id').references('product_categories.id');
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('products')));


        await trx.schema.createTable('cart_items',table => {
            table.increments('id').primary().notNullable()
            table.string('quntity').notNullable()
            table.integer('user_id').notNullable();
            table.foreign('user_id').references('users.id');
            table.integer('product_id').notNullable();
            table.foreign('product_id').references('products.id');
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('cart_items')));

        await trx.schema.createTable('product_reviews_ratings',table => {
            table.increments('id').primary().notNullable()
            table.string('review').notNullable()
            table.integer('rating').notNullable()
            table.integer('user_id').notNullable();
            table.foreign('user_id').references('users.id');
            table.integer('product_id').notNullable();
            table.foreign('product_id').references('products.id');
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('product_reviews_ratings')));

        await trx.schema.createTable('orders',table => {
            table.increments('id').primary().notNullable()
            table.integer('ammount').notNullable()
            table.string('order_number').unique().notNullable()
            table.timestamp('order_placed').notNullable();
            table.enum('status', Object.values(OrderStatus)).notNullable();
            table.jsonb('billing_info').nullable();
            table.enum('payment_mode', Object.values(PaymentMode)).notNullable();
            table.integer('user_id').notNullable();
            table.foreign('user_id').references('users.id');
            table.timestamp('delivery_date').nullable()
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('orders')));

        await trx.schema.createTable('order_items',table => {
            table.increments('id').primary().notNullable()
            table.integer('ammount').notNullable()
            table.string('quantity').notNullable()
            table.integer('order_id').notNullable();
            table.foreign('order_id').references('orders.id');
            table.integer('product_id').notNullable();
            table.foreign('product_id').references('products.id');
            table.timestamps(true, true);
        }).then(() => knex.raw(onUpdateTrigger('order_items')));
        
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.transaction(async trx => {
        await trx.schema.dropTable('product_reviews_ratings');
        await trx.schema.dropTable('cart_items');
        await trx.schema.dropTable('order_items');
        await trx.schema.dropTable('products');
        await trx.schema.dropTable('product_categories');
        await trx.schema.dropTable('orders');
        await trx.schema.dropTable('users');
        await trx.schema.dropTable('roles');
    })
}

    