import axios from 'axios';
import { Request, Response } from 'express';

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

    const { data: userData } = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    response.json(userData);
  }
}

export default new AuthController();
