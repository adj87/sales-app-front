import React, { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
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
import Button from '../../components/Button';
import InputText from '../../components/Inputs/InputText';
import dayjs from 'dayjs';
import { IProductWithFareLine } from './duck/types/IProductWithFare';
import InputCheckBox from '../../components/Inputs/InputCheckbox';

interface CataloguesProps {
  fares: IFare[];
  fare: IFare | null;
  products: IProduct[];
  fetchProducts: Function;
  fetchFares: Function;
  setFare: Function;
  setProducts: Function;
  productsInCatalogue: IProduct[];
  setLoadingOn: Function;
  setLoadingOff: Function;
}

interface configState {
  showFare: boolean;
  name: string;
}

const CataloguesComponent = ({
  fetchFares,
  fetchProducts,
  products,
  fares,
  setFare,
  fare,
  setProducts,
  productsInCatalogue,
  setLoadingOn,
  setLoadingOff,
}: CataloguesProps) => {
  const { t } = useTranslation();
  const [config, setConfig] = useState<configState>({ name: 'Documento', showFare: true });
  useEffect(() => {
    fetchFares();
    fetchProducts();
    return () => {
      setFare(null);
      setProducts([]);
    };
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
              const productsInCatalogueWithFares: IProductWithFareLine[] = productsInCatalogue.map((pr: IProduct) => {
                const productFare = f.fare_lines.find((fl: IFareLine) => fl.product_id == pr.id);
                return { ...pr, fareLine: productFare };
              });
              setProducts(productsInCatalogueWithFares);
            }}
            // @ts-ignore
            value={fare?.customer_id}
            labelText={t('catalogues.fare')}
            optionLabel={(opt: IFare) => opt.customer_name ?? ''}
            optionValue={(opt: IFare) => opt.customer_id ?? ''}
          />
          <Select
            options={products}
            onChange={(elements: any) => setProducts(elements ? elements : [])}
            value={productsInCatalogue}
            labelText={t('catalogues.products')}
            optionLabel={(opt: IProduct) => opt.name ?? ''}
            optionValue={(opt: IProduct) => opt.id ?? ''}
            isMulti
          />
          <div className="mt-16">
            <InputText
              value={config.name}
              label={t('catalogues.name')}
              name={'name'}
              onChange={(name: string, val: string) => setConfig((oldState) => ({ ...oldState, [name]: val }))}
            />
            <InputCheckBox
              label={'catalogues.showFare'}
              value={config.showFare}
              name={'showFare'}
              onChange={(name: string, val: string) => setConfig((oldState) => ({ ...oldState, [name]: val }))}
            />
          </div>
          <Button
            onClick={async () => {
              setLoadingOn();
              const doc = <CatalogueTemplate products={productsInCatalogue} showFare={config.showFare} />;
              // @ts-ignore
              const asPdf = pdf([]);
              asPdf.updateContainer(doc);
              const blob = await asPdf.toBlob();
              const fileName = `${config.name} ${dayjs().format('DD_MM_YYYY')}`;
              saveAs(blob, fileName);
              setLoadingOff();
            }}
            className="mt-4"
            text={t('commons.download')}
            color="secondary"
            size="block"
          />
        </div>
        <div className="lg:col-span-3 lg:mt-5">
          <Label>{t('catalogues.sort')}</Label>
          <DragAndDropList items={productsInCatalogue} setItems={setProducts} />
        </div>
      </div>
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
