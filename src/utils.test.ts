import DivisionUtil from './utils';

let divisionUtil: DivisionUtil;

beforeEach(() => {
  divisionUtil = new DivisionUtil([
    {
      v: '110000',
      n: '北京市',
      c: [
        {
          v: '110100',
          n: '市辖区',
          c: [
            { v: '110101', n: '东城区' },
            { v: '110102', n: '西城区' },
            { v: '110105', n: '朝阳区' },
            { v: '110106', n: '丰台区' },
            { v: '110107', n: '石景山区' },
            { v: '110108', n: '海淀区' },
            { v: '110109', n: '门头沟区' },
            { v: '110111', n: '房山区' },
            { v: '110112', n: '通州区' },
            { v: '110113', n: '顺义区' },
            { v: '110114', n: '昌平区' },
            { v: '110115', n: '大兴区' },
            { v: '110116', n: '怀柔区' },
            { v: '110117', n: '平谷区' },
            { v: '110118', n: '密云区' },
            { v: '110119', n: '延庆区' }
          ]
        }
      ]
    }
  ]);
});

describe('DivisionUtil', () => {
  describe('getChildrenByCode', () => {
    it('获取省级数据', () => {
      expect(divisionUtil.getChildrenByCode()).toEqual([{ v: '110000', n: '北京市' }]);
    });

    it('获取市级数据', () => {
      expect(divisionUtil.getChildrenByCode('110000')).toEqual([
        { v: '110100', n: '市辖区' }
      ]);
    });

    it('获取区域数据', () => {
      expect(divisionUtil.getChildrenByCode('110100')).toEqual([
        { v: '110101', n: '东城区' },
        { v: '110102', n: '西城区' },
        { v: '110105', n: '朝阳区' },
        { v: '110106', n: '丰台区' },
        { v: '110107', n: '石景山区' },
        { v: '110108', n: '海淀区' },
        { v: '110109', n: '门头沟区' },
        { v: '110111', n: '房山区' },
        { v: '110112', n: '通州区' },
        { v: '110113', n: '顺义区' },
        { v: '110114', n: '昌平区' },
        { v: '110115', n: '大兴区' },
        { v: '110116', n: '怀柔区' },
        { v: '110117', n: '平谷区' },
        { v: '110118', n: '密云区' },
        { v: '110119', n: '延庆区' }
      ]);
    });
  })

  describe('getChildrenByCode', () => {
    it('获取省级名称', () => {
      expect(divisionUtil.getNameByCode('110000')).toEqual('北京市');
    });

    it('获取市级名称', () => {
      expect(divisionUtil.getNameByCode('110100')).toEqual('市辖区');
    });

    it('获取区级名称', () => {
      expect(divisionUtil.getNameByCode('110112')).toEqual('通州区');
    });

    it('获取不存在的省市区', () => {
      expect(divisionUtil.getNameByCode('999999')).toEqual('');
    });
  })
});
