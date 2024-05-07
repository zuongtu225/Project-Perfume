import { Exclude } from 'class-transformer';
import { ProductSize } from 'src/modules/productSize/entities/productSize.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sizes' })
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  size: string;
  @Column({ unique: true, type: 'decimal', precision: 10, scale: 1 })
  percent: number;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @OneToMany(() => ProductSize, (productSize) => productSize.sizeId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productSizes: ProductSize[];
}
