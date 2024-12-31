import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/product/product.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CloudinaryProvider } from '../cloudinary/cloudinary.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsService, CloudinaryProvider],
  controllers: [ProductsController],
})
export class ProductsModule {}
