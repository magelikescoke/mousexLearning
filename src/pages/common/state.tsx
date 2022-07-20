// 落户数据状态
//落户-保存
const AGZ116_SAVE = '0';
//落户-退回
const AGZ116_BACK = '1';
//落户-已提交 审核中 待审核
const AGZ116_EXAMINE = '2';
//落户-审核完成 审批中 待1级审批
const AGZ116_APPROVAL1 = '3';
//落户-审核完成 审批中 待2级审批
const AGZ116_APPROVAL2 = '4';
//落户-审核完成 审批中 待3级审批
const AGZ116_APPROVAL3 = '5';
//落户-审核完成 审批中 待4级审批
const AGZ116_APPROVAL4 = '6';
//落户-审批完成
const AGZ116_END = '9';

// 项目类型
// 海外赤子
const AGZ130_OverseasPlan = '1';
//
const AGZ130_HighLevel = '2';
//
const AGZ130_CorumPlan = '3';
//
const AGZ130_EnableProgram = '4';

// 高层次...项目状态
//高层次、昆仑、创业项目状态-待提交 保存
const AGZ266_SAVE = '0';
//高层次、昆仑、创业项目状态-退回
const AGZ266_BACK = '1';
//高层次、昆仑、创业项目状态-已提交 待审核 审核中
const AGZ266_EXAMINE = '2';
//高层次、昆仑、创业项目状态-审核通过 待审批 审批中
const AGZ266_APPROVAL = '3';
//高层次、昆仑、创业项目状态-审批通过 待分组 分组中
const AGZ266_GROUP = '4';
//高层次、昆仑、创业项目状态-分组完成 待评分
const AGZ266_SCORE = '5';
//高层次、昆仑、创业项目状态-评分完成 待报批
const AGZ266_REPORT = '6';
//高层次、昆仑、创业项目状态-已报批 待遴选
const AGZ266_SELECT = '7';
//高层次、昆仑、创业项目状态-入选失败
const AGZ266_SELECT_DEFEAT = '8';
//高层次、昆仑、创业项目状态-遴选通过
const AGZ266_SELECT_SUCCESS = '9';

// 海外赤子和跟踪状态
// 海外赤子计划申请状态 待提交
const AGZ267_SAVE = '0';
// 海外赤子计划申请状态 已退回
const AGZ267_BACK = '1';
// 海外赤子计划申请状态 正在审核
const AGZ267_EXAMINE = '2';
// 海外赤子计划申请状态 正在审批
const AGZ267_APPROVAL = '3';
// 海外赤子计划申请状态 审批完成（结束）
const AGZ267_END = '9';

// 业务类型Code
//业务类型-留学落户
const AGZ193_VISA_ABROAD = '1';
//业务类型-赴台落户
const AGZ193_VISA_TAIWAN = '2';
//业务类型-项目海外赤子
const AGZ193_PRO_OVERSEAS = '3';
//业务类型-项目高层次
const AGZ193_PRO_HIGH = '4';
//业务类型-项目昆仑
const AGZ193_PRO_CORUM = '5';
//业务类型-项目创业启动
const AGZ193_PRO_STARTBUS = '6';
//业务类型-跟踪调查-高层次
const AGZ193_Follow_HIGH = '7';
//业务类型-跟踪调查-昆仑
const AGZ193_Follow_CORUM = '8';
//业务类型-跟踪调查-创业启动
const AGZ193_Follow_STARTBUS = '9';
//业务类型-数据汇总
const AGZ193_PRO_FOLLOW = '10';


export default {
    AGZ193_VISA_ABROAD,
    AGZ193_VISA_TAIWAN,
    AGZ193_PRO_OVERSEAS,
    AGZ193_PRO_HIGH,
    AGZ193_PRO_CORUM,
    AGZ193_PRO_STARTBUS,
    AGZ193_Follow_HIGH,
    AGZ193_Follow_CORUM,
    AGZ193_Follow_STARTBUS,
    AGZ193_PRO_FOLLOW,
    AGZ267_SAVE,
    AGZ267_BACK,
    AGZ267_EXAMINE,
    AGZ267_APPROVAL,
    AGZ267_END,
    AGZ116_SAVE,
    AGZ116_BACK,
    AGZ116_EXAMINE,
    AGZ116_APPROVAL1,
    AGZ116_APPROVAL2,
    AGZ116_APPROVAL3,
    AGZ116_APPROVAL4,
    AGZ116_END,
    AGZ130_OverseasPlan,
    AGZ130_HighLevel,
    AGZ130_CorumPlan,
    AGZ130_EnableProgram,
    AGZ266_SAVE,
    AGZ266_BACK,
    AGZ266_EXAMINE,
    AGZ266_APPROVAL,
    AGZ266_GROUP,
    AGZ266_SCORE,
    AGZ266_REPORT,
    AGZ266_SELECT,
    AGZ266_SELECT_DEFEAT,
    AGZ266_SELECT_SUCCESS
};