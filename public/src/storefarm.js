const {
  Actions,
  Builder,
  Capabilities,
  By,
  Key,
  until
} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");
const fs = require('fs');

const isDev = require("electron-is-dev");
var isWin = process.platform === "win32";
// jquery를 사용하기위해
const {
  app,
  BrowserWindow,
  ipcMain,
  ipcRenderer
} = require('electron')
const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

let driver;
let actions, kb, mouse;

var sender;
// ! ipcrender 통신용


async function start(sender_param) {
  sender = sender_param;
  await makeDriver();
}

async function makeDriver() {
  var driverName = isWin ? "chromedriver.exe" : "chromedriver";

  var driver_path = isDev ?
    path.join(__dirname, "../assets/drivers/", driverName) :
    path.join(__dirname, "../../../", "drivers", driverName);
  
  var chromeService = new chrome.ServiceBuilder(driver_path);

  const chromeOptions = new chrome.Options();

  // ! Headless Mode
  chromeOptions.addArguments("--headless");
  // chromeOptions.addArguments("--disable-gpu");
  // ! Disable GPU Rendering
  chromeOptions.addArguments("--incognito");
  // ! Set Private Browsing
  chromeOptions.addArguments("--ignore-certificate-erros");
  // ! Set SSL 오류 무시
  chromeOptions.addArguments("--window-size=1920,1080");
  // ! Set 윈도우 크기 1920 x 1080
  chromeOptions.addArguments(
    "--user-agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3629.169 Safari/537.36'"
  );

  driver = new Builder()
    .forBrowser("chrome")
    .setChromeService(chromeService)
    .setChromeOptions(chromeOptions)
    .build();

  actions = driver.actions({
    async: true,
  });
  mouse = actions.mouse();
  kb = actions.keyboard();
}

async function Login(username,password) {
  await driver.get("https://sell.smartstore.naver.com/#/login");
  await driver
    .wait(until.elementLocated(By.xpath('//ul[@class="seller-tap-simple"]')), oneSecond*10)
  await driver
    .findElement(By.xpath('//ul[@class="seller-tap-simple"]/li[2]/a'))
    .click();;
  await driver
    .wait(until.elementLocated(By.xpath('//fieldset[@class="login_form"]')), oneSecond*10)
  await driver
    .findElement(By.xpath('//input[@id="id"]'))
    .sendKeys(username)
  await driver.sleep(oneSecond * 1.4);
  await driver
    .findElement(By.xpath('//input[@id="pw"]'))
    .sendKeys(password)
  
  await driver
    .sleep(oneSecond * 1.8)
  await driver
    .findElement(By.xpath('//input[@id="log.login"]'))
    .click();

  await Close_Notice();
  
  // ! Check Login User
  let userInfo;
  try {
    userInfo = await driver
    .findElement(By.xpath('//a[@ui-sref="main.seller-member"]'))
    .getAttribute("innerHTML");
    userInfo = userInfo.split(' 님',2)[0].trim();
    // ! 로그인 정보 분리
  } catch (e) {
    userInfo="NOT_LOGGED_IN";
  }

  console.log(userInfo)
  
  sender.send("response_crawler_login", userInfo);
}

async function Close_Notice() {
  try{
    await driver.wait(
      until.elementLocated(By.xpath('//div[@class="seller-btn-area"]/button')),
      oneSecond * 5
    );
  } catch(e) {
    return;
  }
  
  while (true) {
    try {
      try {
        await driver
          .findElement(By.xpath('//div[@class="seller-btn-area"]/button[2]'))
          .click();
      } catch (e) {
        await driver
          .findElement(By.xpath('//div[@class="seller-btn-area"]/button'))
          .click();
      }
      await driver.sleep(oneSecond);
    } catch (e) {
      break;
    }
  }
}

async function GetmainInfo () {
  await driver.get('https://sell.smartstore.naver.com/#/home/dashboard')
  await Close_Notice()
  let returnData = {
    waitPurchase: '',    // 결제대기
    newPurchase: '',     // 신규주문
    departtoday: '',     // 오늘출발
    bookedOrder: '',     // 예약구매
    waitDelivery: '',    // 배송준비
    onDelivery: '',      // 배송중
    finishDelivery: '',  // 배송완료
    requestCancle: '',   // 취소요청
    requestReturn: '',   // 반품요청
    requestExchange: '', // 교환요청
    confirmPurchase: '', // 구매확정
    calculateToday: '',  // 오늘정산
    calculateExpect: '', // 정산예정
    chargedMoney: ''     // 충전금
  }

  await driver.wait(
    until.elementLocated(
      By.xpath('//div[@name="naverpay-salesinfo"]')
    )
    , oneSecond * 5
  )

  returnData.waitPurchase = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.paymentwait"]')).getAttribute('innerHTML')
  returnData.newPurchase = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.new"]')).getAttribute('innerHTML')
  returnData.departtoday = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.departtoday"]')).getAttribute('innerHTML')
  returnData.bookedOrder = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.preord"]')).getAttribute('innerHTML')
  returnData.waitDelivery = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.wait"]')).getAttribute('innerHTML')
  returnData.onDelivery = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.ing"]')).getAttribute('innerHTML')
  returnData.finishDelivery = await driver.findElement(By.xpath('//a[@data-nclicks-code="orddel.completed"]')).getAttribute('innerHTML')
  returnData.requestCancle = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.cancel"]')).getAttribute('innerHTML')
  returnData.requestReturn = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.return"]')).getAttribute('innerHTML')
  returnData.requestExchange = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.exchange"]')).getAttribute('innerHTML')
  returnData.confirmPurchase = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.confirmed"]')).getAttribute('innerHTML')
  returnData.calculateToday = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.today"]')).getAttribute('innerHTML')
  returnData.calculateExpect = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.expected"]')).getAttribute('innerHTML')
  returnData.chargedMoney = await driver.findElement(By.xpath('//a[@data-nclicks-code="claimset.charge"]')).getAttribute('innerHTML')
  
  sender.send("response_main_info", returnData);
}


module.exports = {
  start,
  Login,
  GetmainInfo
}