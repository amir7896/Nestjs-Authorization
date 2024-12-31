import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateProductDto, GetProductsDto } from '../dtos/product/product.dto';
import { multerOptions } from '../multer/multer.options';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Get all products
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: GetProductsDto) {
    return this.productsService.findAll(query);
  }

  // Create product
  @Post('')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() product: CreateProductDto,
  ) {
    console.log('File :', file);
    const imageUrl = file.path; // The Cloudinary URL

    const upatedPayload = { ...product, imageUrl };
    return this.productsService.create({ ...upatedPayload });
  }

  // Get single product
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productsService.findOne({ id });
  }

  // Update product
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() product: CreateProductDto) {
    return this.productsService.update(id, product);
  }

  // Delete product
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove({ id });
  }
}
