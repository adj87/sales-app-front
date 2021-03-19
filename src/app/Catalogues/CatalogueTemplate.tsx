import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
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
    // margin: 20,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    width: '50%',
    marginTop: 100,
  },
  right: {
    width: '50%',
  },
});

// Create Document Component
export const CatalogueTemplate = ({ products }: { products: IProduct[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {products.map((el: IProduct) => (
          <View style={styles.wrapper}>
            <Image src={imgUrl(el.id)} style={styles.left} />
            <Text style={styles.right}>{el.name}</Text>
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
