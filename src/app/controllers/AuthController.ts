import axios from 'axios';
import { Request, Response } from 'express';

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

    const { data } = await axios.post(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    response.json(data);
  }
}

export default new AuthController();
