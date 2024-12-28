import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Partial<Product>) {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Partial<Product>) {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
