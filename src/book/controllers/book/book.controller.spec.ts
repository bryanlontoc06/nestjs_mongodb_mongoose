import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBookDto } from 'src/book/dtos/UpdateBookDto.dto';
import { User } from '../../../auth/schemas/user.schema';
import { CreateBookDto } from '../../../book/dtos/CreateBookDto.dto';
import { Category } from '../../schemas/book.schema';
import { BookService } from '../../services/book/book.service';
import { BookController } from './book.controller';

describe('BookController', () => {
  let bookService: BookService;
  let bookController: BookController;

  const mockBook = {
    _id: '61c0ccf11d7bf83d153d7c06',
    user: '61c0ccf11d7bf83d153d7c06',
    title: 'New Book',
    description: 'Book Description',
    author: 'Author',
    price: 100,
    category: Category.FANTASY,
  };

  const mockUser = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Ghulam',
    email: 'ghulam1@gmail.com',
  };

  const mockBookService = {
    findAll: jest.fn().mockResolvedValueOnce([mockBook]),
    createBook: jest.fn(),
    getBookById: jest.fn().mockResolvedValueOnce(mockBook),
    updateBookById: jest.fn(),
    deleteBookById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookController = module.get<BookController>(BookController);
  });

  it('should be defind', () => {
    expect(bookController).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should get all books', async () => {
      const result = await bookController.getBooks({
        page: '1',
        keyword: 'test',
      });

      expect(bookService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockBook]);
    });
  });

  describe('createBook', () => {
    it('should create a new books', async () => {
      const newBook = {
        title: 'New Book',
        description: 'Book Description',
        author: 'Author',
        price: 100,
        category: Category.FANTASY,
      };

      mockBookService.createBook = jest.fn().mockResolvedValueOnce(mockBook);

      const result = await bookController.createBook(
        newBook as CreateBookDto,
        mockUser as User,
      );

      expect(bookService.createBook).toHaveBeenCalled();
      expect(result).toEqual(mockBook);
    });
  });

  describe('getBookById', () => {
    it('should get a books by ID', async () => {
      const result = await bookController.getBook(mockBook._id);

      expect(bookService.getBookById).toHaveBeenCalledWith(mockBook._id);
      expect(result).toEqual(mockBook);
    });
  });

  describe('updateBook', () => {
    it('should update book by its ID', async () => {
      const updatedBook = { ...mockBook, title: 'Updated name' };
      const book = { title: 'Updated name' };

      mockBookService.updateBookById = jest
        .fn()
        .mockResolvedValueOnce(updatedBook);

      const result = await bookController.updateBook(
        mockBook._id,
        book as UpdateBookDto,
      );

      expect(bookService.updateBookById).toHaveBeenCalled();
      expect(result).toEqual(updatedBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a books by ID', async () => {
      const result = await bookController.deleteBook(mockBook._id);

      expect(bookService.deleteBookById).toHaveBeenCalledWith(mockBook._id);
      expect(result).toEqual({ deleted: true });
    });
  });
});
