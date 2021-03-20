import React, { useEffect } from 'react';
import { saveAs } from 'file-saver';
import MainLayout from '../../layouts/Main';
import Select from '../../components/Select';
import { AppStoreInterface } from '../../store/AppStoreInterface';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import operations from './duck/operations';
import { IFare, IFareLine } from '../Fares/duck/types/Fare';
import { IProduct } from '../Products/duck/types/Product';
import { DragAndDropList } from './DragAndDrop';
import Label from '../../components/Label';
import { CatalogueTemplate } from './CatalogueTemplate';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import Button from '../../components/Button';

interface CataloguesProps {
  fares: IFare[];
  fare: IFare | null;
  products: IProduct[];
  fetchProducts: Function;
  fetchFares: Function;
  setFare: Function;
  setProducts: Function;
  productsInCatalogue: IProduct[];
}

const CataloguesComponent = ({ fetchFares, fetchProducts, products, fares, setFare, fare, setProducts, productsInCatalogue }: CataloguesProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    fetchFares();
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-24">
        <div className="lg:col-span-3">
          <Select
            options={fares}
            onChange={(f: IFare) => {
              setFare(f);
              // @ts-ignore
              const idsInFare: string[] = f.fare_lines.map((el: IFareLine) => el.product_id);
              const productsInCatalogue: IProduct[] = products.filter((el: IProduct) => idsInFare.includes(el.id));
              setProducts(productsInCatalogue);
            }}
            // @ts-ignore
            value={fare?.customer_id}
            labelText={t('Catalogo')}
            optionLabel={(opt: IFare) => opt.customer_name ?? ''}
            optionValue={(opt: IFare) => opt.customer_id ?? ''}
          />
          <Select
            options={products}
            onChange={(elements: any) => setProducts(elements ? elements : [])}
            value={productsInCatalogue}
            labelText={t('Catalogo')}
            optionLabel={(opt: IProduct) => opt.name ?? ''}
            optionValue={(opt: IProduct) => opt.id ?? ''}
            isMulti
          />
        </div>
        <div className="lg:col-span-3 lg:mt-5">
          <Label>{t('Ordena los productos')}</Label>
          <DragAndDropList items={productsInCatalogue} setItems={setProducts} />
        </div>
      </div>
      <Button
        onClick={async () => {
          const doc = <CatalogueTemplate products={productsInCatalogue} />;
          // @ts-ignore
          const asPdf = pdf([]);
          asPdf.updateContainer(doc);
          const blob = await asPdf.toBlob();
          saveAs(blob, 'somename.pdf');
        }}
        text="Download"
        color="secondary"
      />
    </MainLayout>
  );
};

const mapStateToProps = (state: AppStoreInterface) => ({
  fares: state.fares.data.fares,
  products: state.products.data,
  fare: state.catalogues.fare,
  productsInCatalogue: state.catalogues.products,
});

const mapDispatchToProps = {
  ...operations,
};

export const Catalogues = connect(mapStateToProps, mapDispatchToProps)(CataloguesComponent);
