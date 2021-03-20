import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { IProduct } from '../Products/duck/types/Product';
import { getPhpBackHostUrl } from '../../utils';
import { useTranslation } from 'react-i18next';

const backEnd = process.env.REACT_APP_BACK;
const backHost = process.env.REACT_APP_BACK_HOST;
const imgUrl = (id: string) => (backEnd == 'NODE' ? `${backHost}/images/${id}.png` : `${getPhpBackHostUrl()}/images?id=${id}`);

// Create Document Component
export const CatalogueTemplate = ({ products }: { products: IProduct[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {products.map((el: IProduct, i: number) => (
          <View style={styles.wrapper} break={i < 0}>
            <Image src={imgUrl('logo')} style={styles.logo} />
            <Text style={styles.title}>{el.name}</Text>
            <View style={styles.photoAndInfoWrapper}>
              <Image src={imgUrl(el.id)} style={styles.photo} />
              <InfoDetails product={el} style={styles} />
            </View>
          </View>
        ))}
      </View>
    </Page>
    {/*     {products.map((pr: IProduct, i: number) => {
      <Page size="A4" style={styles.page} key={`${pr.id}-i`}>
        <View style={styles.section}>
          <Text>{pr.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>{pr.name}</Text>
        </View>
      </Page>;
    })} */}
  </Document>
);

const InfoDetails = ({ product, style }: { product: IProduct; style: ReactPDF.Styles }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.infoWrapper}>
      <Text style={styles.sectionTitle}>{'Detalle de sección'}</Text>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.code-bar')}</Text>
        <Text style={styles.infoDetailValue}>{product.code_bar}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.capacity')}</Text>
        <Text style={styles.infoDetailValue}>{product.capacity}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.weight')}</Text>
        <Text style={styles.infoDetailValue}>{product.weight}</Text>
      </View>
      <Text style={styles.sectionTitle}>{'Detalle de caja'}</Text>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.units-per-box')}</Text>
        <Text style={styles.infoDetailValue}>{product.units_per_box}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.box-capacity')}</Text>
        <Text style={styles.infoDetailValue}>{product.box_capacity}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.box-weight')}</Text>
        <Text style={styles.infoDetailValue}>{product.box_weight}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.box-length')}</Text>
        <Text style={styles.infoDetailValue}>{product.box_length}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.box-width')}</Text>
        <Text style={styles.infoDetailValue}>{product.box_width}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.box-height')}</Text>
        <Text style={styles.infoDetailValue}>{product.box_height}</Text>
      </View>
      <Text style={styles.sectionTitle}>{'Detalle de pallet'}</Text>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.pallet-boxes')}</Text>
        <Text style={styles.infoDetailValue}>{product.pallet_boxes}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.pallet-base')}</Text>
        <Text style={styles.infoDetailValue}>{product.pallet_base}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.pallet-capacity')}</Text>
        <Text style={styles.infoDetailValue}>{product.pallet_capacity}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.pallet-height')}</Text>
        <Text style={styles.infoDetailValue}>{product.pallet_height}</Text>
      </View>
      <View style={styles.infoDetail}>
        <Text style={styles.infoDetailLabel}>{t('commons.pallet-weight')}</Text>
        <Text style={styles.infoDetailValue}>{product.pallet_weight}</Text>
      </View>
    </View>
  );
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    flexGrow: 1,
    width: '100%',
    // margin: 20,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  logo: {
    width: '50%',
    textAlign: 'center',
    marginHorizontal: 140,
    marginTop: 15,
  },
  title: {
    textAlign: 'center',
    width: '100%',
    color: 'grey',
    marginTop: 20,
  },
  photoAndInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoWrapper: {
    flexDirection: 'column',
    width: '40%',
    marginTop: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: '#f6f6f6',
    // borderLeftColor: 'black',

    borderRadius: 5,
  },
  infoDetail: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  infoDetailLabel: {
    fontSize: 10,
    color: 'grey',
  },
  infoDetailValue: {
    fontSize: 12,
  },
  photo: {
    width: '50%',
    marginTop: 100,
  },
  info: {
    width: '50%',
  },
});
