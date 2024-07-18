import { useEffect, useState } from "react";
import clsx from "clsx";
import { formatCurrency, getIdFromNameId, rateSale } from "src/utils/utils";
import { Button } from "antd";
import { useTheme } from "@material-ui/core";
import { ProductDetail } from "src/types/allProductsType.interface";
import { useAppDispatch } from "src/hooks/useRedux";
import { getDetailProduct } from "src/store/product/productsSlice";
import { useParams } from "react-router-dom";

type Props = {
  productData: ProductDetail;
  onClick: any;
};

const Tag = ({ productData, onClick }: Props) => {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const [price, setPrice] = useState(
    productData.lstProductTypeAndPrice[0]?.price,
  );
  const { productSlug } = useParams();
  const dispatch = useAppDispatch();
  const params = getIdFromNameId(productSlug as string);

  useEffect(() => {
    dispatch(getDetailProduct(params.idProduct));
  }, [dispatch, params.idProduct]);

  const [salePrice, setSalePrice] = useState(
    productData.lstProductTypeAndPrice[0]?.salePrice,
  );
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedRom, setSelectedRom] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedDepot, setSelectedDepot] = useState<number | null>(null);

  useEffect(() => {
    if (selectedRam === null) {
      const uniqueRams = [
        ...new Set(
          productData.lstProductTypeAndPrice.map((item: any) => item.ram),
        ),
      ].sort((a, b) => parseInt(a) - parseInt(b)); // Sort RAM options numerically
      if (uniqueRams.length > 0) {
        setSelectedRam(uniqueRams[0]);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (selectedRom === null) {
      const uniqueRoms = [
        ...new Set(
          productData.lstProductTypeAndPrice.map(
            (item: any) => item.storageCapacity,
          ),
        ),
      ].sort((a, b) => parseInt(a) - parseInt(b)); // Sort ROM options numerically
      if (uniqueRoms.length > 0) {
        setSelectedRom(uniqueRoms[0]);
      }
    }
  }, [productData]);

  useEffect(() => {
    if (selectedRam !== null && selectedRom !== null) {
      const colorsForSelectedRamAndRom = productData.lstProductTypeAndPrice
        .filter(
          (item: any) =>
            item.ram === selectedRam && item.storageCapacity === selectedRom,
        )
        .map((item: any) => item.color);

      if (colorsForSelectedRamAndRom.length > 0) {
        setSelectedColor(colorsForSelectedRamAndRom[0]);
      }
    }
  }, [selectedRam, selectedRom, productData]);

  useEffect(() => {
    const selectedProduct = productData.lstProductTypeAndPrice.find(
      (item: any) =>
        item.storageCapacity === selectedRom &&
        item.color === selectedColor &&
        item.ram === selectedRam,
    );
    console.log(selectedProduct)
    if (selectedProduct) {
      setPrice(selectedProduct.price);
      setSalePrice(selectedProduct.salePrice);
      setSelectedQuantity(selectedProduct.quantity);
      setSelectedDepot(selectedProduct.depotId);
    } else {
      setSelectedQuantity(null);
      setSelectedDepot(null);
    }
    console.log(selectedQuantity)
    onClick &&
      onClick({
        price,
        salePrice,
        selectedRom,
        selectedColor,
        selectedRam,
        typeId: selectedProduct?.typeId || null,
        selectedQuantity,
        selectedDepot,
      });
  }, [selectedRom, selectedColor, productData, onClick, selectedRam,selectedQuantity]);

  return (
    <div className="mb-4">
      {!selectedQuantity ? (
        <h1 className="text-4xl text-red-500">Hết hàng</h1>
      ) : (
        <>
          {salePrice > 0 && salePrice !== price ? (
            <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
              <div className="text-gray-500 line-through">
                ₫{formatCurrency(price)}
              </div>
              <div className="ml-3 text-4xl font-medium text-mainColor">
                ₫{formatCurrency(salePrice)}
              </div>
              <div className="ml-4 rounded-sm bg-orange-300 px-1 py-[2px] text-lg font-semibold uppercase text-black">
                {rateSale(salePrice, price)} giảm
              </div>
            </div>
          ) : (
            <div className="mt-8 flex items-center bg-gray-50 px-5 py-4">
              <div className="ml-3 text-4xl font-medium text-mainColor">
                ₫{formatCurrency(price)}
              </div>
            </div>
          )}
        </>
      )}

      {productData.lstProductTypeAndPrice[0]?.ram != null && (
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            ...new Set(
              productData.lstProductTypeAndPrice.map((item: any) => item.ram),
            ),
          ]
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort RAM options numerically
            .map((ram: any, index) => {
              const active = ram === selectedRam;
              const className = clsx("border  px-10 py-4 text-xl rounded");

              return (
                <Button
                  style={{
                    color: active ? `${PRIMARY_MAIN}` : "",
                    border: active ? `1px solid ${PRIMARY_MAIN}` : "",
                  }}
                  className={className}
                  key={index}
                  onClick={() => {
                    setSelectedRam(ram);
                    setSelectedColor(null);
                  }}
                >
                  {ram}
                </Button>
              );
            })}
        </div>
      )}

      {productData.lstProductTypeAndPrice[0]?.storageCapacity != null && (
        <div className="flex flex-wrap gap-4 mb-4">
          {[
            ...new Set(
              productData.lstProductTypeAndPrice.map(
                (item: any) => item.storageCapacity,
              ),
            ),
          ]
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort ROM options numerically
            .map((rom: any, index) => {
              const active = rom === selectedRom;
              const className = clsx("border  px-10 py-4 text-xl rounded");

              return (
                <Button
                  style={{
                    color: active ? `${PRIMARY_MAIN}` : "",
                    border: active ? `1px solid ${PRIMARY_MAIN}` : "",
                  }}
                  className={className}
                  key={index}
                  onClick={() => {
                    setSelectedRom(rom);
                    setSelectedColor(null);
                  }}
                >
                  {rom}
                </Button>
              );
            })}
        </div>
      )}

      {productData.lstProductTypeAndPrice[0]?.color != null && (
        <div className="flex flex-wrap gap-4">
          {[
            ...new Set(
              productData.lstProductTypeAndPrice
                .filter(
                  (item: any) =>
                    item.ram === selectedRam &&
                    item.storageCapacity === selectedRom,
                )
                .map((item: any) => item.color),
            ),
          ].map((color: any, index: number) => {
            const active = color === selectedColor;
            const className = clsx("border  px-10 py-4 text-xl rounded");

            return (
              <Button
                style={{
                  color: active ? `${PRIMARY_MAIN}` : "",
                  border: active ? `1px solid ${PRIMARY_MAIN}` : "",
                }}
                className={className}
                key={index}
                onClick={() => {
                  setSelectedColor(color);
                }}
              >
                {color}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tag;

