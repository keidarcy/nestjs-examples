import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result._id;
  }

  async getProducts() {
    // return this.products;
    const result = await this.productModel
      .find()
      .select(['title', 'description', 'price']);
    return result.map(({ id, title, description, price }) => {
      return {
        id,
        title,
        description,
        price,
      };
    });
  }

  async getSingleProduct(id: string) {
    return await this.findProduct(id);
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.findProduct(id);
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    product.save();
  }

  async deleteProduct(id: string) {
    await this.productModel.findByIdAndDelete(id);
  }

  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel
        .findById(id)
        .select(['title', 'description', 'price']);
    } catch (error) {
      if (!product) {
        throw new NotFoundException('Could not find product');
      }
    }

    // const productIndex = this.products.findIndex((prod) => prod.id === id);
    // const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return product;
    // return [product, productIndex];
  }
}
