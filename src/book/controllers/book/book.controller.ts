import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateBookDto } from 'src/book/dtos/CreateBookDto.dto';
import { UpdateBookDto } from 'src/book/dtos/UpdateBookDto.dto';
import { Book } from 'src/book/schemas/book.schema';
import { BookService } from 'src/book/services/book/book.service';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookService.findAll(query);
  }

  @Post('new')
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    createBook: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return await this.bookService.createBook(createBook, req.user);
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getBookById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    updateBook: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBookById(id, updateBook);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.deleteBookById(id);
  }
}
