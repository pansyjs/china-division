export interface DivisionData {
  /**
   * 省市区编码
   */
  v: string;
  /**
   * 省市区名称
   */
  n: string;
  /**
   * 省市区子节点
   */
  c?: DivisionData[];
}

export interface CascaderOption {
  /**
   * 省市区编码
   */
  value: string;
  /**
   * 省市区名称
   */
  label: string;
   /**
   * 省市区子节点
   */
  children?: CascaderOption[];
}
