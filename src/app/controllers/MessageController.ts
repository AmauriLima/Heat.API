import { Request, Response } from 'express';
import PrismaClient from '../prisma';

class MessageController {
  async store(request: Request, response: Response) {
    const { message: text } = request.body;

    const { user_id } = request;

    const message = await PrismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    response.status(201).json(message);
  }
}

export default new MessageController();
