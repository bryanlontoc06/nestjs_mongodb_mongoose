import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter correct category.' })
  category: Category;

  @IsEmpty({ message: 'You cannot pass user ID.' })
  user: User;
}
