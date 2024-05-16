import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { ProductSizeDto } from './dto/productSize.dto';
import {
  IProductSize,
  IProductSizeUpdate,
} from './interface/productSize.interface';
import { ProductSizeRepository } from './productSize.repository';
import { ProductSize } from './entities/productSize.entity';
import { IProduct } from '../product/interface/Product.interface';
@Injectable()
export class ProductSizeService {
  constructor(private readonly productSizeRepository: ProductSizeRepository) {}
  async createProductSizeService(body: ProductSizeDto): Promise<any> {
    let response: IProductSize;
    if (Array.isArray(body)) {
      for (const item of body) {
        const productSize: IProductSize = {
          productId: item.productId,
          sizeId: item.sizeId,
          stock: item.stock,
        };
        response = await this.productSizeRepository.create(productSize);
      }
    } else {
      throw new BadRequestException('Dữ liệu không hợp lệ');
    }
    if (response) {
      return {
        success: true,
        message: 'Tạo ProductSize thành công',
        data: response,
      };
    }
    throw new BadRequestException('Tạo ProductSize thất bại');
  }

  async getAllProductSizeService(): Promise<IProductSize[]> {
    return await this.productSizeRepository.findAll();
  }
  async getDetailProductSize(id: number): Promise<ProductSize | IResponse> {
    const response = await this.productSizeRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id ProductSize không đúng',
      };
    }
    return response;
  }

  async updateProductSizeService(body: IProductSizeUpdate): Promise<IResponse> {
    let response: IProductSizeUpdate;
    if (Array.isArray(body)) {
      for (const item of body) {
        const idCurrent = item.id; // id ProductSize
        const productSize: IProductSize = {
          productId: item.productId,
          sizeId: item.sizeId,
          stock: item.stock,
        };
        response = await this.productSizeRepository.updateProductSize(
          idCurrent,
          productSize,
        );
      }
    } else {
      throw new BadRequestException('Dữ liệu không hợp lệ');
    }
    if (response) {
      return {
        success: true,
        message: 'Cập nhật ProductSize thành công',
        data: '',
      };
    }
    throw new BadRequestException('Tạo ProductSize thất bại');
  }
  async deleteProductSizeService(id: IProduct): Promise<IResponse> {
    const response = await this.productSizeRepository.delete(id);
    if (response.affected > 0) {
      return {
        data: null,
        success: true,
        message: 'Xoá thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id product không đúng',
    };
  }
}
