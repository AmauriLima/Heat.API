import { Request, Response } from 'express';
import PrismaClient from '../prisma';

class ProfileController {
  async show(request: Request, response: Response) {
    const { user_id } = request;

    const user = await PrismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    response.status(200).json({ user });
  }
}

export default new ProfileController();
