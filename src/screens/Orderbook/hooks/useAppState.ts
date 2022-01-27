import {useEffect} from 'react';
import {AppState} from 'react-native';
import {subscriptionPaused} from '~/store/slices/orderbook';
import {useAppDispatch} from '~/store/hooks';

export const useAppState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', appState => {
      if (appState === 'background') {
        dispatch(subscriptionPaused());
      }
    });

    return () => {
      appStateListener.remove();
    };
  }, [dispatch]);
};
