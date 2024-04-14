
import { Request, Response } from 'express';

export async function getPrivacyPolicyHandler(req: Request, res: Response) {
  const privacyPolicy = `
    <h1>Privacy Policy</h1>
    <p>This privacy policy outlines how we handle your personal information...</p>
  `;
  
  res.send(privacyPolicy);
}

export async function getTermsAndConditionsHandler(req: Request, res: Response) {
  const terms = `
    <h1>Terms and Conditions</h1>
    <p>By using this service you agree to the following terms...</p>
  `;

  res.send(terms);  
}