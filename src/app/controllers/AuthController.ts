import { Request, Response } from 'express';

class AuthController {
  signInWithGithub(request: Request, response: Response) {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
  }

  signInCallback(request: Request, response: Response) {
    const { code } = request.query;

    response.json({ code });
  }
}

export default new AuthController();
