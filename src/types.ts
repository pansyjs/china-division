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
