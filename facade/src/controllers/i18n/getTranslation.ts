import { Request, Response, NextFunction }  from 'express';
import { i18nModel } from '../../model/i18n.model';
import ApiError from '../../error/ApiError';

import { LANGUAGES, DEFAULT_LANGUAGE} from '../../constants/i18n'

const getTranslations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cookies: { language = DEFAULT_LANGUAGE } = {} } = req;

    const isLanguageNotValid = !language || !LANGUAGES?.find((lang: string) => lang === language);
    const validLanguage = isLanguageNotValid ? DEFAULT_LANGUAGE : language;
    const result = await i18nModel.aggregate([
      {
        $match: {
          'sets.language': { $in: [validLanguage, DEFAULT_LANGUAGE] }
        }
      },
      {
        $addFields: {
          matchedSet: {
            $let: {
              vars: {
                langIndex: {
                  $indexOfArray: ['$sets.language', validLanguage]
                },
                fallbackIndex: {
                  $indexOfArray: ['$sets.language', DEFAULT_LANGUAGE]
                }
              },
              in: {
                $cond: [
                  { $gte: ['$$langIndex', 0] },
                  { $arrayElemAt: ['$sets', '$$langIndex'] },
                  {
                    $cond: [
                      { $gte: ['$$fallbackIndex', 0] },
                      { $arrayElemAt: ['$sets', '$$fallbackIndex'] },
                      null
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          keyValue: {
            k: '$label',
            v: '$matchedSet.text'
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: { $arrayToObject: [['$keyValue']] }
        }
      }
    ]);

    const translations = Object.assign({}, ...result);
    
    res.status(200).send(translations);
    
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export default getTranslations;
