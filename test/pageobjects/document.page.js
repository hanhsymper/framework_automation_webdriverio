const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DocumentPage extends Page {
  //super truy cập và gọi hàm cha
  open() {
    return super.open("documents");
  }

  pause(time = 10000) {
    return super.pause(time);
  }
  get documentLink() {
    return $(
      ".v-icon.notranslate.collapse.icon-group.v-icon--link.mdi.mdi-file-document-edit-outline.theme--light"
    );
  }
  async getDoc() {
    await this.documentLink.click();
  }
  get listDoc() {
    return $$(".v-list-item__title.fm.fs-13")[0];
  }
  async getdataShowList() {
    await this.documentLink.waitForDisplayed();
    await this.documentLink.click();
    await this.listDoc.waitForDisplayed();
    await this.listDoc.click();
  }

  get getTText() {
    return $$(".custom-header-label.flex-grow-1");
  }
  async gettitleListText() {
    this.getTText.waitForDisplayed();
    let arrEl = await this.getTText;
    let titleList = [];
    for (let i = 0; i < arrEl.length; i++) {
      let a = await arrEl[i].getText();

      titleList.push(a);
    }
    return titleList;
  }

  get scrollleft() {
    return $(".ag-body-horizontal-scroll-viewport");
  }

  async widthShowListDisplay() {
    await this.scrollleft.waitForDisplayed();
    return await this.scrollleft.getSize("width");
  }
  get scrollTop() {
    return $(".ag-body-viewport.ag-layout-normal.ag-row-no-animation");
  }
  get heightShowList() {
    return $(".ag-center-cols-container");
  }

  get getRow() {
    return $('.ag-center-cols-container [row-index="0"] [aria-colindex="2"]');
  }
  async heighFulltShowList() {
    await this.heightShowList.waitForDisplayed();
    return await this.heightShowList.getSize("height");
  }
  async widthFullShowList() {
    await this.heightShowList.waitForDisplayed();
    return await this.heightShowList.getSize("width");
  }
  get heightOneRow() {
    return $$(".ag-center-cols-container [role='row']")[0];
  }
  get listRowDisplay() {
    return $$(".ag-center-cols-container [role='row']");
  }
  async valueHeightOneRow() {
    await this.heightOneRow.waitForDisplayed();
    return await this.heightOneRow.getSize("height");
  }
  // async valueFile() {

  checkfield(nameFile, data) {
    const a = data.find((e) => e == nameFile);
    return a;
  }
  getIndexRow(data) {
    let ar = data.reduce(function (acc, el) {
      if (acc.indexOf(el) === -1 || el != "") {
        acc.push(el);
      }
      return acc;
    }, []);
    return ar;
  }
  get atributte() {
    return $$(".ag-header-cell.ag-focus-managed.ag-header-cell-sortable");
  }
  async getAllAtribute() {
    this.atributte.waitForDisplayed();
    let arrEl = await this.atributte;
    let arrAtr = [];
    for (let i = 0; i < arrEl.length; i++) {
      let a = await arrEl[i].getAttribute("aria-colindex");
      arrAtr.push(a);
    }
    return arrAtr;
  }
  getAttFile(data, fileName) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] == fileName) {
        return i;
      } else {
        continue;
      }
    }
  }

  async checkIncreaseLeft(data, nameFile, width, dem) {
    // console.log(this.widthFullShowList());
    let widthFullSize = await this.widthFullShowList();
    let widthDisplay = await this.widthShowListDisplay();
    let count = widthFullSize / widthDisplay;
    let e = await this.scrollleft;
    for (let i = dem; i <= count; i++) {
      if (this.checkfield(nameFile, data)) {
        return data;
      } else if (!this.checkfield(nameFile, data) && dem < count) {
        dem = dem + 1;
        browser.scrollLeft(e.selector, width);
        // await this.pause();
        data = await this.gettitleListText();
        await this.checkIncreaseLeft(data, nameFile, width, dem);
      } else {
        browser.scrollLeft(e.selector, widthFullSize - width * dem);
        // await this.pause();
        data = await this.gettitleListText();
      }
    }
    return data;
  }

  async getDataRow(i, dem, arr) {
    let countMax = await this.heighFulltShowList();
    let heightRow = await this.valueHeightOneRow();
    let count = countMax / heightRow;
    let rowDisPlay = await this.listRowDisplay.length;

    for (let j = dem; j < count; j++) {
      if (j < rowDisPlay) {
        let a = await $(
          '.ag-center-cols-container [row-id="' +
            j +
            '"] [aria-colindex="' +
            i +
            '"]'
        ).getText();
        arr.push(a);
      } else {
        dem = rowDisPlay;
        let t = countMax - heightRow * dem;
        let v = await this.scrollTop;
        browser.execute(
          function (elSelector, index) {
            document.querySelector(elSelector).scrollTop += index;
          },
          v.selector,
          t
        );
        await this.getDataRow(i, dem, arr);
      }
      // return arr;
    }

    return arr;
  }
  // get actionFilter() {
  //   return $(
  //     ".fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button"
  //   );
  // }
  async actionFilter(i) {
    await $(
      '.ag-header-row.ag-header-row-column [aria-colindex="' +
        i +
        '"] i.fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button'
    ).waitForDisplayed();

    await $(
      '.ag-header-row.ag-header-row-column [aria-colindex="' +
        i +
        '"] i.fs-13.symper-table-dropdown-button.mdi.mdi-filter-variant.symper-filter-button'
    ).click();
  }
  get clickSorf() {
    return $$(".pb-1.dropdown-item.grey-hover")[1];
  }
  async clickActionSorf() {
    await $(".symper-table-filter-container.elevation-8").waitForDisplayed();
    this.clickSorf.waitForDisplayed();
    await this.clickSorf.click();
  }
  get clickFilter() {
    return $$(".w-100.v-btn.v-btn--depressed.theme--light.v-size--small")[0];
  }
  async selecAction() {
    await this.clickFilter.waitForDisplayed();
    await this.clickFilter.click();
  }
  get item() {
    return $(".v-list-item__title=Bằng");
  }
  get inputText() {
    return $$(
      ".v-input.sym-small-size.mt-2.v-input--dense.theme--light.v-text-field.v-text-field--single-line.v-text-field--is-booted.v-text-field--enclosed.v-text-field--outlined .v-input__control .v-input__slot .v-text-field__slot input"
    )[0];
  }
  get buttonApply() {
    return $(
      ".float-right.v-btn.v-btn--depressed.theme--light.v-size--small.primary"
    );
  }
  async clickAction(key) {
    await this.selecAction();
    await $(
      ".v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active"
    ).waitForDisplayed();
    await this.item.waitForDisplayed();
    // await this.pause(1000);
    await this.item.click();
    await this.inputText.waitForDisplayed();
    await this.inputText.setValue(key);
    await this.buttonApply.click();
  }
}

module.exports = new DocumentPage();
