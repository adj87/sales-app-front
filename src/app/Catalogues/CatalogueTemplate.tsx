import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { IProduct } from '../Products/duck/types/Product';
import { getPhpBackHostUrl } from '../../utils';

const backEnd = process.env.REACT_APP_BACK;
const backHost = process.env.REACT_APP_BACK_HOST;
const imgUrl = (id: string) => (backEnd == 'NODE' ? `${backHost}/images/${id}.png` : `${getPhpBackHostUrl()}/images?id=${id}`);

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
  },
  infoWrapper: {
    flexDirection: 'column',
  },
  infoDetail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  photo: {
    width: '50%',
    marginTop: 100,
  },
  info: {
    width: '50%',
  },
});

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
  return (
    <View style={styles.infoWrapper}>
      <View style={styles.infoDetail}>
        <Text>{'capacidad'}</Text>
        <Text>{product.box_capacity}</Text>
        <Text></Text>
      </View>
    </View>
  );
};
