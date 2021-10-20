import { Request, Response } from 'express';
import socketIo from 'socket.io';
import PrismaClient from '../prisma';

class MessageController {
  async store(request: Request, response: Response) {
    const { message: text } = request.body;

    const { user_id } = request;

    const io = request.io as socketIo.Server;

    const message = await PrismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    io.emit('new_message', infoWS);

    response.status(201).json(message);
  }
}

export default new MessageController();
