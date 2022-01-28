describe('Orderbook screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have orderbook header item', async () => {
    await expect(element(by.id('OrderBookHeader'))).toBeVisible();
  });

  it('should have feed toggle button visible', async () => {
    await expect(element(by.id('FeedToggleButton'))).toBeVisible();
  });

  it('should show Toggle Feed title in toggle button', async () => {
    await expect(element(by.id('FeedToggleButton-label'))).toHaveText('Toggle Feed');
  });

  it('should show ETH after tap', async () => {
    await expect(element(by.text('Toggle Feed'))).toExist();
  });

  it('should show ETH after tap', async () => {
    await element(by.id('FeedToggleButton')).tap();
    await expect(element(by.text('PI_ETHUSD'))).toExist();
  });

  it('should show BTC after tap', async () => {
    await element(by.id('FeedToggleButton')).tap();
    await expect(element(by.text('PI_XBTUSD'))).toExist();
  });
});
