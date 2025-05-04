
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const i18nSetSchema = new Schema(
  {
    language: { type: String },
    text: { type: String },
  },
  { _id: false }
);

const i18nSchema = new Schema({
  label: { type: String, unique: true, required: true },
  sets: [i18nSetSchema],
});

i18nSchema.index({ 'sets.text': 'text' }, { default_language: 'en', language_override: 'none' });

const i18nModel = mongoose.model('i18n', i18nSchema);
export { 
  i18nModel 
};