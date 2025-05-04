import 'module-alias/register.js';
import mongoose from 'mongoose';

// Mongoose connection
import connection from '../src/mongooseeConnection';

// Models
import { i18nModel } from "../src/model/i18n.model";

// Helpers
import { error as errorLogger, info as infoLogger } from '../src/helpers/logger.hl';

const createEntity = async (data: any) => {
    try {
      await i18nModel.create(data);
      infoLogger({
        ref: 'createEntity',
        message: `Translation with label '${data?.label}' successfully inserted.`
    });
    } catch (error: any) {
        return;
    }
}

const executeScript = async () => {
    try {
        await connection();
        const translations = require(`../deltas/translations/data.json`)?.map(({
            __v,
            _id,
            ...rest
        }: any) => {
            return {
                ...rest,
                sets: rest?.sets?.map(({
                    _id,
                    __v,
                    ...resti
                }: any) => ({
                    ...resti
                }))
            }
        });

        for (const translation of translations) {
          await createEntity(translation);
        }
        mongoose.connection.close();
    } catch (error: any) {

        errorLogger({
            ref: 'executeScript',
            error
        });
        mongoose.connection.close();
    }
}

executeScript();
