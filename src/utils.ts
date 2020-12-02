import { DivisionData } from './types';

class DivisionUtil<T extends object = DivisionData> {
  private divisions: DivisionData[];
  private cache: Record<string, DivisionData[]>;

  constructor(list: DivisionData[]) {
    this.divisions = list;
    this.cache = {};
  }

  /**
   * 获取省级别的数据集合
   */
  getProvinces = (): DivisionData[] => {
    if (!Array.isArray(this.divisions) || this.divisions.length === 0) return [];

    if (this.cache.divisions) {
      return this.cache.divisions;
    } else {
      const divisions = this.divisions.map((item) => ({ v: item.v, n: item.n }));

      this.cache.divisions = divisions;

      return divisions;
    }
  };

  /**
   * 获取指定省市区编码的下一级数据。 若不指定，则获取省一级数据
   * @param list 省市区树形数据
   * @param code 省市区编码
   */
  getChildrenByCode = (code?: string) => {
    if (!code) return this.getProvinces();
    if (typeof code !== 'string' || code.length !== 6) return [];

    let codes: string[] = [];

    for (let i = 0; i < 3; i++) {
      codes.push(code.slice(i * 2, i * 2 + 2));
    }

    codes = codes.filter((item) => +item);

    codes.forEach((item, index, arr) => {
      const codeStr = ``;
    });

    console.log(codes);

    // 110100
    //

    // codes = codes.map(item => {

    // })

    return [];
  };
}

export default DivisionUtil;
