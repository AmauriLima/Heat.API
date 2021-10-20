import { Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import PrismaClient from '../prisma';

interface IAccessTokenResponse {
  access_token: string,
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string,
}

class AuthController {
  signInWithGithub(request: Request, response: Response) {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
  }

  signInCallback(request: Request, response: Response) {
    const { code } = request.query;
    response.json({ code });
  }

  async authenticate(request: Request, response: Response) {
    const { code } = request.body;

    const url = 'https://github.com/login/oauth/access_token';

    const { data: { access_token } } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    let userData;
    try {
      const { data } = await axios.get<IUserResponse>('https://api.github.com/user', {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      });
      userData = data;
    } catch (err) {
      return response.status(401).json({ err: err.message });
    }

    const {
      id, login, name, avatar_url,
    } = userData;

    let user = await PrismaClient.user.findFirst({
      where: {
        github_id: id,
      },

    });

    if (!user) {
      user = await PrismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = jwt.sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id,
      },
    }, process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: '1d',
    });

    response.json({
      user, token,
    });
  }
}

export default new AuthController();
