import { CascaderOption } from './types';

type SourceKeys = 'code' | 'name' | 'children';

type Options = Record<SourceKeys, string>;

const defaultOptions: Options = {
  code: 'value',
  name: 'label',
  children: 'children'
}

class DivisionUtil<S = CascaderOption, O = CascaderOption> {
  private divisions: S[];
  private cache: Record<string, any>;
  private sourceOptions: Options;
  private outputOptions: Options;

  constructor(
    list: S[] = [],
    options?: {
      source?: Partial<Options>,
      output?: Partial<Options>
    }
  ) {
    this.divisions = list;
    this.cache = {};
    this.sourceOptions = {...defaultOptions, ...options?.source};
    this.outputOptions = {...defaultOptions, ...options?.output};
  }

  /**
   * 获取数据源
   */
  getSourceData = (): S[] => {
    return this.divisions ?? [];
  }

  /**
   * 获取省级别的数据
   */
  getProvinces = (): O[] => {
    if (!Array.isArray(this.divisions) || this.divisions.length === 0) return [];

    if (this.cache.divisions) {
      return this.cache.divisions;
    } else {
      const divisions = this.divisions.map(this._formatDivision);

      this.cache.divisions = divisions;

      return divisions as O[];
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

  _getProvinceData = (code: string): S => {
    let province: S;

    // 尝试读取缓存
    if (this.cache[code]) {
      province = this.cache[code];
    } else {
      for (let i = 0; i < this.divisions.length; i++) {
        if (this.divisions[i][`${this.sourceOptions.code}`]?.startsWith(code)) {
          this.cache[code] = province = this.divisions[i];
          break;
        }
      }
    }

    return province;
  }

  _formatDivision = (item) => {
    return {
      [`${this.outputOptions.code}`]: item[this.sourceOptions.code],
      [`${this.outputOptions.name}`]: item[this.sourceOptions.name]
    }
  }

  /**
   * 获取指定省市区编码的下一级数据。若不指定，则获取省一级数据
   * @param code 省市区编码
   */
  getChildrenByCode = (code?: string): O[] => {
    if (!code) return this.getProvinces();
    if (typeof code !== 'string' || code.length !== 6) return [];
    if (this.cache[code]) return this.cache[code];

    const codes: string[] = this._getCodes(code);
    const province = this._getProvinceData(codes[0]);

    if (!province) return [];

    let children = province[`${this.sourceOptions.children}`] ?? [];

    for (let i = 1; i < codes.length; i++) {
      const currentCode = codes.slice(0, i).reduce((next, current) => next + current, '');

      for (let item of children) {
        if (item[`${this.sourceOptions.code}`]?.startsWith(currentCode)) {
          children = item[`${this.sourceOptions.children}`] ?? [];
        }
      }
    }

    const list = children.map(this._formatDivision);

    this.cache[code] = list;

    return list;
  };

  /**
   * 通过省市区编码获取省市区名称
   * @param code
   */
  getNameByCode = (code: string): string => {
    return this.getDivisionByCode(code)?.[this.outputOptions.name] ?? ''
  }

  /**
   * 根据Code获取节点信息
   * @param code
   */
  getDivisionByCode = (code: string): O | null => {
    const codes: string[] = this._getCodes(code);
    const province = this._getProvinceData(codes[0]);

    if (!province) return null;

    let divisionData = province;

    for (let i = 1; i < codes.length; i++) {
      const currentCode = codes.slice(0, i + 1).reduce((next, current) => next + current, '');

      for (let item of (divisionData[`${this.sourceOptions.children}`] || [])) {
        if (item[`${this.sourceOptions.code}`]?.startsWith(currentCode)) {
          divisionData = item;
        }
      }
    }

    if (!divisionData) return null;

    return this._formatDivision(divisionData) as O;
  };
}

export default DivisionUtil;
