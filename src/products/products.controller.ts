import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard) // Authentication required
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Authentication + Authorization (Admin only)
  @Roles('admin')
  @Post()
  create(
    @Body() product: { name: string; description?: string; price: number },
  ) {
    return this.productsService.create(product);
  }

  // Get single product
  @UseGuards(JwtAuthGuard, RolesGuard) // Authentication + Authorization (Admin only)
  @Roles('admin', 'user')
  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Authentication + Authorization (Admin only)
  @Roles('admin')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() product: { name: string; description?: string; price: number },
  ) {
    return this.productsService.update(id, product);
  }

  @UseGuards(JwtAuthGuard, RolesGuard) // Authentication + Authorization (Admin only)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
