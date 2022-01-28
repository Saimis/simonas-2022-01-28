import React, {useState, useRef} from 'react';
import {Box} from '~/components/Box';
import {Button} from '~/components/Button';
import {useAppDispatch, useAppSelector} from '~/store/hooks';
import {
  subscribedToProduct,
  unsubscribedFromProduct,
} from '~/store/slices/orderbook';
import {ProductId} from '~/store/slices/orderbook';
import {RootState} from '~/store';

export const Actions = () => {
  const titleTimeout = useRef<NodeJS.Timeout>();
  const dispatch = useAppDispatch();
  const [buttonTitle, setButtonTitle] = useState<string>('Toggle Feed');

  const productId: ProductId = useAppSelector(
    (state: RootState) => state.orderbook.productId,
  );

  const toggleProduct = async () => {
    const product =
      productId === ProductId.XBTUSD ? ProductId.ETHUSD : ProductId.XBTUSD;

    dispatch(unsubscribedFromProduct());
    dispatch(subscribedToProduct(product));

    setButtonTitle(product);

    if (titleTimeout.current) {
      clearTimeout(titleTimeout.current);
    }
    titleTimeout.current = setTimeout(() => {
      setButtonTitle('Toggle Feed');
    }, 5000);
  };

  return (
    <Box pb={2}>
      <Button onPress={toggleProduct} testID="FeedToggleButton">
        {buttonTitle}
      </Button>
    </Box>
  );
};
