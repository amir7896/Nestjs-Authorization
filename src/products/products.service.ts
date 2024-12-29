import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product/product.schema';
import {
  CreateProductDto,
  GetProductsDto,
  ProductIDDto,
} from '../dtos/product/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  // Find all products
  async findAll(query: GetProductsDto) {
    const { search, price, page = 1, limit = 10 } = query;

    const filter: any = {};

    // Search by name
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    // Filter by price range
    if (price !== undefined) {
      filter.price = { $lte: price };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const products = await this.productModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.productModel.countDocuments(filter).exec();

    return {
      data: products,
      total,
      page,
      limit,
    };
  }

  // Get single product
  async findOne(param: ProductIDDto) {
    const { id } = param;
    return this.productModel.findById(id).exec();
  }

  // Update product
  async update(id: string, product: CreateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  // Delete Product
  async remove(params: ProductIDDto) {
    const { id } = params;
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
