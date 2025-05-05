import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Api
import { fetchAddPropduct } from '../../http/productApi'

// Components
import { Text } from '../../common/components'

// Types
import { I18N } from '../../middlewares/i18n/types';
import { ICreateProductFormValues } from './types';

// Constatnts
import { PRODUCT_ROUTE } from '../../common/constants/routes.conts';
import { EXCHANGE_PRICE_USD } from '../../common/constants/exchangeRate';

// Styles
import styles from './create.module.sass';

const today = new Date();
const oneYearLater = new Date();
oneYearLater.setFullYear(today.getFullYear() + 1);

const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    translation
  } = useSelector((state: any) => state.i18n as I18N);
  const typeOptions = [
    {
      text: translation?.monitors,
      value: 'monitors'

    },
    {
      text: translation?.smartphones,
      value: 'smartphone'
    }
  ];
  const conditionOptions = [
    {
      text: translation?.new,
      value: '1'
    },
    {
      text: translation?.secondHand,
      value: '0'
    }
  ];
  const validationSchema = Yup.object({
    title: Yup.string().min(2, translation?.tooShort).required(translation?.fieldRequired),
    specification: Yup.string().min(2, translation?.tooShort).required(translation?.fieldRequired),
    guarantee: Yup.object({
      start: Yup.date().nullable().required(translation?.fieldRequired),
      end: Yup.date().nullable().required(translation?.fieldRequired),
  
    }),
    price: Yup.array()
    .of(
      Yup.object({
        value: Yup.number()
          .min(0, translation?.fieldRequired)
          .required(translation?.fieldRequired),
        symbol: Yup.string()
          .oneOf(['USD', 'UAH'], translation?.fieldRequired)
          .required(translation?.fieldRequired),
        isDefault: Yup.number()
          .oneOf([0, 1], translation?.fieldRequired)
          .required(translation?.fieldRequired),
      })
    )
    .test('only-one-default', translation?.fieldRequired as string, (prices) => {
      if (!prices) return false;
      const defaultCount = prices.filter(p => p.isDefault === 1).length;
      return defaultCount === 1;
    })
    .required(translation?.fieldRequired),
    condition: Yup.string().oneOf(['1', '0'], translation?.fieldRequired).required(translation?.fieldRequired),
    type: Yup.string().required(translation?.fieldRequired),
  
    photo: Yup.mixed()
      .required(translation?.fieldRequired)
      .test('fileSize', translation?.tooBig as string, value => {
        return value && value.size <= 2 * 1024 * 1024; // ≤ 2MB
      })
      .test('fileType', translation?.invalidFileFormat as string, value => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      }),
  
  });

  const formik = useFormik<ICreateProductFormValues>({
    initialValues: {
      title: '',
      specification: '',
      password: '',
      photo: null,
      condition: '',
      type: '',
      price: [],
      guarantee: { start: today, end: oneYearLater },
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('specification', values.specification);
      formData.append('guarantee', JSON.stringify(values.guarantee));
      formData.append('condition', values.condition);
      formData.append('type', values.type);
      formData.append('price', JSON.stringify(values.price))
      if (values.photo) {
        formData.append('photo', values.photo);
      }
      try {
        await fetchAddPropduct(formData)
        navigate(PRODUCT_ROUTE)
      } catch (error) {
        console.log(error)
      }
    },
  });
  const priceExchange = (price: number) => {
    const totalUsd = price / EXCHANGE_PRICE_USD;
    formik.setFieldValue('price', [
      { value: +totalUsd.toFixed(2), symbol: 'USD', isDefault: 0 },
      { value: price, symbol: 'UAH', isDefault: 1 },

    ])
    return
  }

  return (
    <div className={styles['create-form']}>
      <div className={styles['create-form__wrapper']}>
        <Col>
          <Text tag="h3">{translation?.addProduct}</Text>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{translation?.name}</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.title && formik.touched.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{translation?.specification}</Form.Label>
              <Form.Control
                type="text"
                name="specification"
                value={formik.values.specification}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.specification && formik.touched.specification}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.specification}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{translation?.guaranteeDate}</Form.Label>
              <div>
                <DatePicker
                  selectsRange
                  startDate={formik?.values?.guarantee?.start}
                  endDate={formik?.values?.guarantee?.end}
                  onChange={(update: [Date | null, Date | null]) => formik.setFieldValue('guarantee', {start: update[0], end: update[1]})}
                  onBlur={formik.handleBlur}
                  minDate={today}
                  maxDate={oneYearLater}
                  dateFormat="dd.MM.yyyy"
                  className={`form-control ${formik.touched.guarantee && formik.errors.guarantee ? 'is-invalid' : ''}`}
                  placeholderText={translation?.selectRange}
                  wrapperClassName="width--100"
                />
                {formik.touched.guarantee && formik.errors.guarantee && (
                  <div className="invalid-feedback d-block">
                    {(formik.errors.guarantee as string)}
                  </div>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{translation?.conditionProduct}</Form.Label>
              <Form.Select
                name="condition"
                value={formik.values.condition || undefined}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={translation?.selectCondition}
                isInvalid={!!formik.errors.condition && formik.touched.condition}
              >
                <option disabled>{translation?.selectCondition}</option>
                {
                  conditionOptions.map(({ value, text }) => (
                    <option key={value} value={value}>{text}</option>
                  )
                  )
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.condition}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{translation?.type}</Form.Label>
              <Form.Select
                name="type"
                value={formik.values.type || undefined}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                defaultValue={translation?.selectType}
                isInvalid={!!formik.errors.type && formik.touched.type}
              >
                <option disabled>{translation?.selectType}</option>
                {
                  typeOptions.map(({ value, text }) => (
                    <option key={value} value={value}>{text}</option>
                  )
                  )
                }
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{translation?.price}</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control aria-label="Dollar amount (with dot and two decimal places)" 
                  type="number"
                  name="price[0].value"
                  onChange={(event) => priceExchange(Number(event.target.value))}
                  onBlur={formik.handleBlur}
                  isInvalid={!!formik.errors.price as any && formik.touched.price}
                />
                <InputGroup.Text className="">{formik?.values?.price[0]?.value || 0} $</InputGroup.Text>

              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {formik?.errors?.price as string}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{translation?.photo}</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const file = event.currentTarget.files?.[0] || null;
                  formik.setFieldValue('photo', file);
                }}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.photo && formik.touched.photo}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.photo as string}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary">
              {translation?.send}
            </Button>
          </Form>
        </Col>
      </div>

    </div>
  );
};

export default CreateForm;
