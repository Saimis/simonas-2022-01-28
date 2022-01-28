describe('App state feed resume', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have visible modal after app was in background state', async () => {
    await device.sendToHome();
    await device.launchApp({newInstance: false});
    await expect(element(by.id('PausedSubscriptionModal'))).toBeVisible();
  });

  it('should have visible modal after app was in background state', async () => {
    await element(by.id('ResumSubscriptionButton')).tap();
    await expect(element(by.id('PausedSubscriptionModal'))).not.toExist();
  });
});
