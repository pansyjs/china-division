import { padEnd, padStart } from 'lodash';

export interface PcaCode {
  code: string;
  name: string;
  children: PcaCode[];
}

interface Options {
  code: string;
  name: string;
  children: string;
}

const HMTCodes = ['81', '82', '71'];

function UniqueId() {
  let code = 0;

  return {
    getId: () => {
      return padStart(++code + '', 2, '0');
    },
    reset: () => {
      code = 0;
    }
  }
}

const cityId = UniqueId();
const areaId = UniqueId();

/**
 * 处理香港、澳门、台湾数据
 */
export function formatHMT(
  data: { [code: string]: { [code: string] : string[] } }
) {
  const list = Object.entries(data)
    .map(([provinceName, provinceItem], provinceIndex) => {
      const provinceCode = HMTCodes[provinceIndex];

      return {
        name: provinceName,
        code: provinceCode,
        children: Object.entries(provinceItem)
          .map(([cityName, cityItem], cityIndex) => {
            const cityCode = cityId.getId();
            if (Object.entries(provinceItem).length === cityIndex + 1) {
              cityId.reset();
            }
            return {
              name: cityName,
              code: `${provinceCode}${cityCode}`,
              children: cityItem.map((area, areaIndex) => {
                const areaCode = areaId.getId();
                if (cityItem.length === areaIndex + 1) {
                  areaId.reset();
                }
                return {
                  name: area,
                  code: `${provinceCode}${cityCode}${areaCode}`,
                }
              })
            }
          })
      }
    });

  return list as PcaCode[];
}

export function formatDistrict(data: PcaCode[], options: Options) {
  return data.map((item) => {
    if (!item.children || item.children.length === 0) {
      return {
        [options.code]: padEnd(item.code, 6, '0'),
        [options.name]: item.name
      };
    } else {
      return {
        [options.code]: padEnd(item.code, 6, '0'),
        [options.name]: item.name,
        [options.children]: formatDistrict(item.children, options)
      };
    }
  });
}
