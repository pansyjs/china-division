import { DivisionData } from './types';

class DivisionUtil {
  private divisions: DivisionData[];
  private cache: Record<string, any>;

  constructor(list: DivisionData[]) {
    this.divisions = list;
    this.cache = {};
  }

  /**
   * 获取数据源
   */
  getSourceData = () => {
    return this.divisions ?? [];
  }

  /**
   * 获取省级别的数据
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

  _getCodes = (code: string): string[] => {
    let codes: string[] = [];

    for (let i = 0; i < 3; i++) {
      codes.push(code.slice(i * 2, i * 2 + 2));
    }
    codes = codes.filter(item => +item);

    return codes;
  }

  _getProvinceData = (code: string): DivisionData => {
    let province: DivisionData;

    // 尝试读取缓存
    if (this.cache[code]) {
      province = this.cache[code];
    } else {
      for (let i = 0; i < this.divisions.length; i++) {
        if (this.divisions[i].v.startsWith(code)) {
          this.cache[code] = province = this.divisions[i];
          break;
        }
      }
    }

    return province;
  }

  /**
   * 获取指定省市区编码的下一级数据。若不指定，则获取省一级数据
   * @param code 省市区编码
   */
  getChildrenByCode = (code?: string) => {
    if (!code) return this.getProvinces();
    if (typeof code !== 'string' || code.length !== 6) return [];
    if (this.cache[code]) return this.cache[code];

    const codes: string[] = this._getCodes(code);
    const province = this._getProvinceData(codes[0]);

    if (!province) return [];

    let children = province.c ?? [];

    for (let i = 1; i < codes.length; i++) {
      const currentCode = codes.slice(0, i).reduce((next, current) => next + current, '');

      for (let item of children) {
        if (item.v.startsWith(currentCode)) {
          children = item.c ?? [];
        }
      }
    }

    const list = children.map(item => ({ v: item.v, n: item.n }));

    this.cache[code] = list;

    return list;
  };

  /**
   * 通过省市区编码获取省市区名称
   * @param code
   */
  getNameByCode = (code: string): string => {
    const codes: string[] = this._getCodes(code);
    const province = this._getProvinceData(codes[0]);

    if (!province) return '';

    let divisionData = province;

    for (let i = 1; i < codes.length; i++) {
      const currentCode = codes.slice(0, i + 1).reduce((next, current) => next + current, '');

      for (let item of (divisionData.c || [])) {
        if (item.v.startsWith(currentCode)) {
          divisionData = item;
        }
      }
    }

    return divisionData.n ?? '';
  }
}

export default DivisionUtil;
