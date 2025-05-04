import { NextFunction, Request, Response }  from 'express';

import { LANGUAGES } from '../../constants/i18n'

const getLanguages = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(LANGUAGES);
}

export default getLanguages;
