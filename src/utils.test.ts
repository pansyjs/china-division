import DivisionUtil from './utils';
import { CascaderOption, DivisionData } from './types';

const sourceData = [
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
]

let divisionUtil: DivisionUtil;
let divisionUtil1: DivisionUtil<DivisionData, CascaderOption>;


beforeEach(() => {
  divisionUtil = new DivisionUtil(sourceData);
  divisionUtil1 = new DivisionUtil<DivisionData, CascaderOption>(sourceData, {
    output: {
      code: 'value',
      name: 'label',
      children: 'children'
    }
  });
});

describe('DivisionUtil default config', () => {
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

  describe('getNameByCode', () => {
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

describe('DivisionUtil other config', () => {
  describe('getChildrenByCode', () => {
    it('获取省级数据', () => {
      expect(divisionUtil1.getChildrenByCode()).toEqual([{ value: '110000', label: '北京市' }]);
    });

    it('获取市级数据', () => {
      expect(divisionUtil1.getChildrenByCode('110000')).toEqual([
        { value: '110100', label: '市辖区' }
      ]);
    });

    it('获取区域数据', () => {
      expect(divisionUtil1.getChildrenByCode('110100')).toEqual([
        { value: '110101', label: '东城区' },
        { value: '110102', label: '西城区' },
        { value: '110105', label: '朝阳区' },
        { value: '110106', label: '丰台区' },
        { value: '110107', label: '石景山区' },
        { value: '110108', label: '海淀区' },
        { value: '110109', label: '门头沟区' },
        { value: '110111', label: '房山区' },
        { value: '110112', label: '通州区' },
        { value: '110113', label: '顺义区' },
        { value: '110114', label: '昌平区' },
        { value: '110115', label: '大兴区' },
        { value: '110116', label: '怀柔区' },
        { value: '110117', label: '平谷区' },
        { value: '110118', label: '密云区' },
        { value: '110119', label: '延庆区' }
      ]);
    });
  });

  describe('getNameByCode', () => {
    it('获取省级名称', () => {
      expect(divisionUtil1.getNameByCode('110000')).toEqual('北京市');
    });

    it('获取市级名称', () => {
      expect(divisionUtil1.getNameByCode('110100')).toEqual('市辖区');
    });

    it('获取区级名称', () => {
      expect(divisionUtil1.getNameByCode('110112')).toEqual('通州区');
    });

    it('获取不存在的省市区', () => {
      expect(divisionUtil1.getNameByCode('999999')).toEqual('');
    });
  })
})
