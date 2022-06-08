const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");
const DocumentPage = require("../pageobjects/document.page");
const {
  getDataText,
  checkfield,
  checkIncreaseLeft,
} = require("../pageobjects/document.page");
const waitAndClick = require("../utilities/helper");
var chai = require("chai");

const lodash = require("lodash");
const documentPage = require("../pageobjects/document.page");
let data_test = "Thời gian tạo";
var assert = chai.assert; // Using Assert style
var expect = chai.expect;

describe("My Login application", (data) => {
  let d;
  let f;
  let g;
  let l;
  let listdata;
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("hanhdth@symper.vn", "Symper@123BA");

    await DocumentPage.getdataShowList();
    await DocumentPage.pause();
    d = await DocumentPage.gettitleListText();

    f = lodash.cloneDeep(d);
  });

  it("Check sorf by Thời gian tạo", async () => {
    // await DocumentPage.pause();

    let widthDisplay = await DocumentPage.widthShowListDisplay();
    let dem = 1;
    let a = await DocumentPage.checkIncreaseLeft(
      f,
      "Thời gian tạo",
      widthDisplay,
      dem
    );
    g = await DocumentPage.getAllAtribute();
    l = DocumentPage.getAttFile(a, "Thời gian tạo");
    listdata = await DocumentPage.getDataRow(g[l], 0, []);
    let data = listdata.sort();
    data = data.reverse();
    await DocumentPage.actionFilter(g[l]);
    await documentPage.clickActionSorf();
    let resData = await DocumentPage.getDataRow(g[l], 0, []);
    console.log(data, resData);
    expect(data).to.deep.equal(resData);
  });
  it("Check filter by Thời gian tạo", async () => {
    await DocumentPage.pause();

    let widthDisplay = await DocumentPage.widthShowListDisplay();
    let dem = 1;
    let a = await DocumentPage.checkIncreaseLeft(
      f,
      "Thời gian tạo",
      widthDisplay,
      dem
    );
    g = await DocumentPage.getAllAtribute();
    let l = DocumentPage.getAttFile(a, "Thời gian tạo");
    await DocumentPage.actionFilter(g[l]);
    await DocumentPage.clickAction("2022-06-04 16:09:37");
    await DocumentPage.pause();
    let dataFilter = await DocumentPage.getDataRow(g[l], 0, []);
    expect(listdata).to.deep.include(dataFilter.join(","));
  });
});
