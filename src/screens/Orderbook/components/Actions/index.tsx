import React, {useState, useEffect} from 'react';
import {Box} from '~/components/Box';
import {Button} from '~/components/Button';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {
  subscribedToProduct,
  unsubscribedFromProduct,
  bookUpdated,
} from '~/store/slices/orderbook';
import {ProductId} from '~/store/slices/orderbook';
import {RootState} from '~/store';

export const Actions = () => {
  const dispatch = useAppDispatch();
  const [buttonTitle, setButtonTitle] = useState<string>('Toggle Feed');
  const [nextProduct, setNextProduct] = useState<ProductId>(ProductId.ETHUSD);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const productId: ProductId = useAppSelector(
    (state: RootState) => state.orderbook.productId,
  );

  useEffect(() => {
    setTimeout(() => {
      setButtonTitle('Toggle Feed');
      setButtonDisabled(false);
    }, 5000);
  }, [buttonTitle]);

  const toggleProduct = async () => {
    const product =
      productId === ProductId.XBTUSD ? ProductId.ETHUSD : ProductId.XBTUSD;
    setNextProduct(product);

    dispatch(unsubscribedFromProduct());
    dispatch(subscribedToProduct(nextProduct));

    setButtonTitle(product);
    setButtonDisabled(true);
  };

  return (
    <Box pb={2}>
      <Button
        onPress={toggleProduct}
        testID="FeedToggleButton"
        isDisabled={buttonDisabled}>
        {buttonTitle}
      </Button>
    </Box>
  );
};
